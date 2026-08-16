(function (root) {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var SHA_PATTERN = /^[0-9a-f]{64}$/;
  var LAYOUT = {
    marginX: 32,
    marginY: 44,
    cardWidth: 228,
    cardHeight: 76,
    columnGap: 118,
    rowGap: 40
  };

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function sortedCopy(records, comparator) {
    return records.slice().sort(comparator);
  }

  function assertUnique(records, keyFor, label) {
    var seen = new Set();
    records.forEach(function (record) {
      var key = keyFor(record);
      assert(!seen.has(key), "Duplicate " + label + " " + key);
      seen.add(key);
    });
  }

  function validatePayloads(labPayload, readingPayload) {
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Unknown composition lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Unknown composition reading payload");
    assert(SHA_PATTERN.test(labPayload.referenceSha256 || "") &&
      SHA_PATTERN.test(labPayload.relationsSha256 || ""),
    "Composition map payload omits source identity");
    assert(labPayload.referenceSha256 === readingPayload.referenceSha256 &&
      labPayload.relationsSha256 === readingPayload.relationsSha256,
    "Composition map payload identity mismatch");
    assert(Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
      "Composition map requires six relations");
    assert(Array.isArray(readingPayload.bindings) && readingPayload.bindings.length === 18,
      "Composition map requires 18 bindings");
  }

  function buildClosureMap(result, labPayload, readingPayload, resultSha256) {
    validatePayloads(labPayload, readingPayload);
    assert(result && result.schema === "factorium-composition-lab-result-v0",
      "Unknown composition result");
    assert(SHA_PATTERN.test(resultSha256 || ""), "Invalid composition result identity");
    assert(result.sources && result.sources.referenceSha256 === labPayload.referenceSha256 &&
      result.sources.relationsSha256 === labPayload.relationsSha256,
    "Composition result source identity mismatch");
    assert(result.request && ["forward", "reverse"].includes(result.request.direction),
      "Invalid composition direction");
    assert(result.graph && Array.isArray(result.graph.nodes) &&
      Array.isArray(result.graph.edges) && Array.isArray(result.graph.frontiers) &&
      Array.isArray(result.graph.unresolvedRelations) &&
      Array.isArray(result.graph.conflicts) &&
      Array.isArray(result.graph.inactiveExclusions),
    "Composition result omits graph records");
    assert(Array.isArray(result.projections) && Array.isArray(result.evaluation),
      "Composition result omits projection or evaluation records");
    assertUnique(result.graph.frontiers, function (record) {
      return record.relation + "|" + record.artifact;
    }, "frontier");
    assertUnique(result.graph.unresolvedRelations, function (record) {
      return record.relation;
    }, "unresolved relation");
    assertUnique(result.graph.conflicts, function (record) { return record.id; }, "conflict");
    assertUnique(result.graph.inactiveExclusions, function (record) {
      return record.artifact;
    }, "inactive exclusion");
    assertUnique(result.evaluation, function (record) { return record.id; }, "evaluation");

    var relationById = new Map();
    labPayload.relations.forEach(function (relation) {
      assert(!relationById.has(relation.id), "Duplicate relation " + relation.id);
      relationById.set(relation.id, relation);
    });
    var bindingByArtifact = new Map();
    readingPayload.bindings.forEach(function (binding) {
      assert(!bindingByArtifact.has(binding.artifact),
        "Duplicate binding " + binding.artifact);
      bindingByArtifact.set(binding.artifact, binding);
    });
    var projectionByArtifact = new Map();
    result.projections.forEach(function (projection) {
      assert(!projectionByArtifact.has(projection.artifact),
        "Duplicate projection " + projection.artifact);
      projectionByArtifact.set(projection.artifact, projection);
    });
    var conflictArtifacts = new Set(result.graph.conflicts.map(function (conflict) {
      return conflict.artifact;
    }));
    var nodeByArtifact = new Map();
    var nodes = result.graph.nodes.map(function (node) {
      assert(!nodeByArtifact.has(node.artifact), "Duplicate graph node " + node.artifact);
      var binding = bindingByArtifact.get(node.artifact);
      assert(binding, "Unknown graph node " + node.artifact);
      assert(["required", "evaluative"].includes(node.class),
        "Invalid graph node class " + node.artifact);
      assert(Number.isInteger(node.depth) && node.depth >= 0,
        "Invalid graph node depth " + node.artifact);
      var projection = projectionByArtifact.get(node.artifact);
      assert(projection && ["selected", "rejected"].includes(projection.disposition),
        "Missing graph-node projection " + node.artifact);
      var role = node.origin === "seed" ? "selected" :
        (node.class === "evaluative" ? "evaluate" : "required");
      var mapped = {
        artifact: node.artifact,
        label: binding.label,
        pageTitle: binding.pageTitle,
        class: node.class,
        depth: node.depth,
        origin: node.origin,
        predecessor: node.predecessor || "",
        disposition: projection.disposition,
        baseRole: role,
        role: conflictArtifacts.has(node.artifact) ? "conflict" : role
      };
      nodeByArtifact.set(node.artifact, mapped);
      return mapped;
    });
    assert(nodes.length === projectionByArtifact.size,
      "Projection contains a non-admitted graph node");

    var admittedRelationIds = new Set();
    var traversals = result.graph.edges.map(function (edge) {
      assert(!admittedRelationIds.has(edge.id), "Duplicate admitted relation " + edge.id);
      admittedRelationIds.add(edge.id);
      var relation = relationById.get(edge.id);
      assert(relation, "Unknown admitted relation " + edge.id);
      ["verb", "source", "target", "scope", "qualifiers"].forEach(function (field) {
        assert(edge[field] === relation[field],
          "Admitted relation drift " + edge.id + " " + field);
      });
      var forward = result.request.direction === "forward";
      var predecessor = forward ? relation.source : relation.target;
      var derived = forward ? relation.target : relation.source;
      assert(nodeByArtifact.has(predecessor) && nodeByArtifact.has(derived),
        "Admitted traversal omits endpoint " + edge.id);
      assert(nodeByArtifact.has(relation.scope) &&
        nodeByArtifact.get(relation.scope).class === "evaluative",
      "Admitted traversal omits evaluative scope " + edge.id);
      return {
        relation: relation.id,
        code: (relation.id.match(/^f\d+/i) || [relation.id])[0].toUpperCase(),
        verb: relation.verb,
        direction: result.request.direction,
        canonicalSource: relation.source,
        canonicalTarget: relation.target,
        predecessor: predecessor,
        derived: derived,
        scope: relation.scope,
        qualifiers: relation.qualifiers
      };
    });

    function relationBoundary(record, kind) {
      var relation = relationById.get(record.relation);
      assert(relation, "Unknown " + kind + " relation " + record.relation);
      var predecessor = result.request.direction === "forward" ?
        relation.source : relation.target;
      var derived = result.request.direction === "forward" ?
        relation.target : relation.source;
      assert(bindingByArtifact.has(predecessor) && bindingByArtifact.has(derived),
        "Unknown " + kind + " endpoint " + record.relation);
      if (record.predecessor) {
        assert(record.predecessor === predecessor,
          "Invalid " + kind + " predecessor " + record.relation);
      }
      return { relation: relation, predecessor: predecessor, derived: derived };
    }

    var frontiers = result.graph.frontiers.map(function (frontier) {
      var boundary = relationBoundary(frontier, "frontier");
      assert(frontier.artifact === boundary.derived,
        "Frontier target drift " + frontier.relation);
      assert(nodeByArtifact.has(boundary.predecessor),
        "Frontier predecessor is not admitted " + frontier.relation);
      var binding = bindingByArtifact.get(frontier.artifact);
      return {
        relation: frontier.relation,
        code: (frontier.relation.match(/^f\d+/i) || [frontier.relation])[0].toUpperCase(),
        predecessor: boundary.predecessor,
        artifact: frontier.artifact,
        label: binding.label,
        pageTitle: binding.pageTitle,
        reason: frontier.reason,
        alreadyAdmitted: nodeByArtifact.has(frontier.artifact)
      };
    });
    var unresolvedRelations = result.graph.unresolvedRelations.map(function (record) {
      var boundary = relationBoundary(record, "unresolved");
      return {
        relation: record.relation,
        code: (record.relation.match(/^f\d+/i) || [record.relation])[0].toUpperCase(),
        predecessor: boundary.predecessor,
        predecessorLabel: bindingByArtifact.get(boundary.predecessor).label,
        reason: record.reason,
        predecessorAdmitted: nodeByArtifact.has(boundary.predecessor)
      };
    });
    var conflicts = result.graph.conflicts.map(function (conflict) {
      assert(nodeByArtifact.has(conflict.artifact),
        "Conflict target is not admitted " + conflict.artifact);
      return {
        id: conflict.id,
        artifact: conflict.artifact,
        label: bindingByArtifact.get(conflict.artifact).label,
        reason: conflict.reason
      };
    });
    var inactiveExclusions = result.graph.inactiveExclusions.map(function (record) {
      var binding = bindingByArtifact.get(record.artifact);
      assert(binding, "Unknown inactive exclusion " + record.artifact);
      return {
        artifact: record.artifact,
        label: binding.label,
        reason: record.reason
      };
    });
    var evaluations = result.evaluation.map(function (check) {
      var binding = bindingByArtifact.get(check.target);
      assert(binding && nodeByArtifact.has(check.target),
        "Evaluation target is not admitted " + check.target);
      return {
        id: check.id,
        kind: check.kind,
        target: check.target,
        label: binding.label,
        outcome: check.outcome
      };
    });

    nodes = sortedCopy(nodes, function (left, right) {
      var roleRank = { selected: 0, required: 1, evaluate: 2 };
      return left.depth - right.depth || roleRank[left.baseRole] - roleRank[right.baseRole] ||
        left.artifact.localeCompare(right.artifact);
    });
    traversals = sortedCopy(traversals, function (left, right) {
      return left.relation.localeCompare(right.relation);
    });
    frontiers = sortedCopy(frontiers, function (left, right) {
      return left.relation.localeCompare(right.relation) ||
        left.artifact.localeCompare(right.artifact);
    });
    unresolvedRelations = sortedCopy(unresolvedRelations, function (left, right) {
      return left.relation.localeCompare(right.relation);
    });
    conflicts = sortedCopy(conflicts, function (left, right) {
      return left.id.localeCompare(right.id);
    });
    inactiveExclusions = sortedCopy(inactiveExclusions, function (left, right) {
      return left.artifact.localeCompare(right.artifact);
    });
    evaluations = sortedCopy(evaluations, function (left, right) {
      return left.id.localeCompare(right.id);
    });

    var rowsByColumn = new Map();
    var positions = [];
    function place(key, artifact, kind, column) {
      var row = rowsByColumn.get(column) || 0;
      rowsByColumn.set(column, row + 1);
      positions.push({
        key: key,
        artifact: artifact,
        kind: kind,
        column: column,
        row: row,
        x: LAYOUT.marginX + column * (LAYOUT.cardWidth + LAYOUT.columnGap),
        y: LAYOUT.marginY + row * (LAYOUT.cardHeight + LAYOUT.rowGap)
      });
    }
    nodes.forEach(function (node) {
      place(node.artifact, node.artifact, "admitted", node.depth);
    });
    frontiers.filter(function (frontier) { return !frontier.alreadyAdmitted; })
      .forEach(function (frontier) {
        var predecessor = nodeByArtifact.get(frontier.predecessor);
        place("frontier:" + frontier.relation + ":" + frontier.artifact,
          frontier.artifact, "frontier", predecessor.depth + 1);
      });
    var maxColumn = positions.reduce(function (maximum, position) {
      return Math.max(maximum, position.column);
    }, 0);
    var maxRows = Array.from(rowsByColumn.values()).reduce(function (maximum, count) {
      return Math.max(maximum, count);
    }, 1);
    var width = Math.max(720, LAYOUT.marginX * 2 + (maxColumn + 1) * LAYOUT.cardWidth +
      maxColumn * LAYOUT.columnGap);
    var height = Math.max(220, LAYOUT.marginY * 2 + maxRows * LAYOUT.cardHeight +
      Math.max(0, maxRows - 1) * LAYOUT.rowGap);

    return {
      schema: "factorium-composition-closure-map-v0",
      resultSha256: resultSha256,
      referenceSha256: labPayload.referenceSha256,
      relationsSha256: labPayload.relationsSha256,
      direction: result.request.direction,
      state: result.state,
      nodes: nodes,
      traversals: traversals,
      evaluations: evaluations,
      frontiers: frontiers,
      unresolvedRelations: unresolvedRelations,
      conflicts: conflicts,
      inactiveExclusions: inactiveExclusions,
      layout: {
        constants: Object.assign({}, LAYOUT),
        width: width,
        height: height,
        positions: positions
      }
    };
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgElement(documentObject, name, attributes) {
    var node = documentObject.createElementNS(SVG_NS, name);
    Object.keys(attributes || {}).forEach(function (key) {
      node.setAttribute(key, String(attributes[key]));
    });
    return node;
  }

  function wrapLabel(value, limit) {
    var words = String(value || "").split(/\s+/);
    var lines = [];
    var current = "";
    words.forEach(function (word) {
      if (!current || (current + " " + word).length <= limit) {
        current = current ? current + " " + word : word;
      } else {
        lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    if (lines.length > 3) {
      lines = lines.slice(0, 3);
      lines[2] = lines[2].replace(/[.,;:]?$/, "…");
    }
    return lines;
  }

  function roleLabel(role) {
    return { selected: "Selected", required: "Required", evaluate: "Evaluate",
      conflict: "Conflict" }[role] || role;
  }

  function renderSvg(documentObject, map, titleId, descriptionId) {
    var svg = svgElement(documentObject, "svg", {
      class: "closure-map__svg",
      viewBox: "0 0 " + map.layout.width + " " + map.layout.height,
      width: map.layout.width,
      height: map.layout.height,
      role: "img",
      "aria-labelledby": titleId + " " + descriptionId
    });
    var title = svgElement(documentObject, "title", { id: titleId });
    title.textContent = "Composition closure map";
    var description = svgElement(documentObject, "desc", { id: descriptionId });
    description.textContent = map.nodes.length + " admitted nodes, " +
      map.traversals.length + " typed traversals, " + map.frontiers.length +
      " frontiers, and " + map.conflicts.length + " conflicts. Exact records follow the image.";
    var defs = svgElement(documentObject, "defs");
    var marker = svgElement(documentObject, "marker", {
      id: "closure-map-arrow", markerWidth: 8, markerHeight: 8,
      refX: 7, refY: 4, orient: "auto", markerUnits: "strokeWidth"
    });
    marker.appendChild(svgElement(documentObject, "path", { d: "M0,0 L8,4 L0,8 Z" }));
    defs.appendChild(marker);
    svg.append(title, description, defs);

    var positionByKey = new Map(map.layout.positions.map(function (position) {
      return [position.key, position];
    }));
    var constants = map.layout.constants;
    function center(position) {
      return {
        x: position.x + constants.cardWidth / 2,
        y: position.y + constants.cardHeight / 2
      };
    }
    function connector(startPosition, endPosition, className, label, sublabel) {
      var start = center(startPosition);
      var end = center(endPosition);
      var startX = startPosition.x < endPosition.x ?
        startPosition.x + constants.cardWidth : start.x;
      var endX = startPosition.x < endPosition.x ? endPosition.x : end.x;
      var bend = Math.max(42, Math.abs(endX - startX) / 2);
      var path = svgElement(documentObject, "path", {
        class: className,
        d: "M " + startX + " " + start.y + " C " + (startX + bend) + " " +
          start.y + ", " + (endX - bend) + " " + end.y + ", " + endX + " " + end.y,
        "marker-end": "url(#closure-map-arrow)"
      });
      svg.appendChild(path);
      var text = svgElement(documentObject, "text", {
        class: "closure-map__edge-label",
        x: (startX + endX) / 2,
        y: (start.y + end.y) / 2 - 8,
        "text-anchor": "middle"
      });
      var primary = svgElement(documentObject, "tspan", { x: (startX + endX) / 2 });
      primary.textContent = label;
      var secondary = svgElement(documentObject, "tspan", {
        x: (startX + endX) / 2, dy: 14, class: "closure-map__edge-direction"
      });
      secondary.textContent = sublabel;
      text.append(primary, secondary);
      svg.appendChild(text);
    }

    function scopeConnector(startPosition, endPosition, scopePosition) {
      var start = center(startPosition);
      var end = center(endPosition);
      var scope = center(scopePosition);
      var midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      var targetY = scopePosition.y > midpoint.y ? scopePosition.y : scope.y;
      var path = svgElement(documentObject, "path", {
        class: "closure-map__scope-edge",
        d: "M " + midpoint.x + " " + midpoint.y + " Q " + scope.x + " " +
          midpoint.y + ", " + scope.x + " " + targetY
      });
      svg.appendChild(path);
      var text = svgElement(documentObject, "text", {
        class: "closure-map__edge-label",
        x: (midpoint.x + scope.x) / 2,
        y: (midpoint.y + targetY) / 2 - 5,
        "text-anchor": "middle"
      });
      var primary = svgElement(documentObject, "tspan", {
        x: (midpoint.x + scope.x) / 2
      });
      primary.textContent = "Evaluate";
      var secondary = svgElement(documentObject, "tspan", {
        x: (midpoint.x + scope.x) / 2, dy: 14,
        class: "closure-map__edge-direction"
      });
      secondary.textContent = "scope owner";
      text.append(primary, secondary);
      svg.appendChild(text);
    }

    map.traversals.forEach(function (traversal) {
      var predecessor = positionByKey.get(traversal.predecessor);
      var derived = positionByKey.get(traversal.derived);
      var scope = positionByKey.get(traversal.scope);
      connector(predecessor, derived, "closure-map__edge",
        traversal.code + " · " + traversal.verb.replace(/-/g, " "),
        traversal.direction + " traversal");
      if (scope.key !== derived.key) {
        scopeConnector(predecessor, derived, scope);
      }
    });
    map.frontiers.filter(function (frontier) { return !frontier.alreadyAdmitted; })
      .forEach(function (frontier) {
        connector(positionByKey.get(frontier.predecessor),
          positionByKey.get("frontier:" + frontier.relation + ":" + frontier.artifact),
          "closure-map__frontier-edge", "Stopped · " + frontier.code, "budget frontier");
      });

    function drawNode(record, position, kind) {
      var role = kind === "frontier" ? "frontier" : record.role;
      var group = svgElement(documentObject, "g", {
        class: "closure-map__node closure-map__node--" + role,
        transform: "translate(" + position.x + " " + position.y + ")",
        "data-artifact": record.artifact
      });
      var exact = svgElement(documentObject, "title");
      exact.textContent = record.artifact + " · " + record.pageTitle;
      group.appendChild(exact);
      group.appendChild(svgElement(documentObject, "rect", {
        width: constants.cardWidth, height: constants.cardHeight, rx: 10, ry: 10
      }));
      var badge = svgElement(documentObject, "text", {
        class: "closure-map__node-role", x: 12, y: 18
      });
      badge.textContent = kind === "frontier" ? "Frontier" : roleLabel(record.role);
      group.appendChild(badge);
      wrapLabel(record.label, 31).forEach(function (line, index) {
        var label = svgElement(documentObject, "text", {
          class: "closure-map__node-label", x: 12, y: 39 + index * 14
        });
        label.textContent = line;
        group.appendChild(label);
      });
      svg.appendChild(group);
    }
    map.nodes.forEach(function (node) {
      drawNode(node, positionByKey.get(node.artifact), "admitted");
    });
    map.frontiers.filter(function (frontier) { return !frontier.alreadyAdmitted; })
      .forEach(function (frontier) {
        drawNode({ artifact: frontier.artifact, label: frontier.label,
          pageTitle: frontier.pageTitle },
        positionByKey.get("frontier:" + frontier.relation + ":" + frontier.artifact),
        "frontier");
      });
    return svg;
  }

  function exactCode(documentObject, value) {
    var code = element(documentObject, "code", "composition-meta--full", value);
    return code;
  }

  function renderExactRecords(documentObject, map) {
    var details = element(documentObject, "details", "closure-map__records");
    details.appendChild(element(documentObject, "summary", "", "Read map records"));
    var body = element(documentObject, "div", "closure-map__records-body");
    body.appendChild(element(documentObject, "h4", "", "Admitted nodes"));
    var nodes = element(documentObject, "ul", "");
    map.nodes.forEach(function (node) {
      var item = element(documentObject, "li", node.role === "conflict" ? "is-conflict" : "");
      item.append(element(documentObject, "strong", "", node.label),
        element(documentObject, "span", "", roleLabel(node.role) + " · depth " +
          node.depth + " · " + node.disposition), exactCode(documentObject, node.artifact));
      nodes.appendChild(item);
    });
    body.appendChild(nodes);
    body.appendChild(element(documentObject, "h4", "", "Typed traversals and checks"));
    var traversals = element(documentObject, "ul", "");
    map.traversals.forEach(function (traversal) {
      var item = element(documentObject, "li", "");
      var predecessor = map.nodes.find(function (node) { return node.artifact === traversal.predecessor; });
      var derived = map.nodes.find(function (node) { return node.artifact === traversal.derived; });
      var scope = map.nodes.find(function (node) { return node.artifact === traversal.scope; });
      item.append(element(documentObject, "strong", "", traversal.code + " · " +
        traversal.verb.replace(/-/g, " ")),
      element(documentObject, "span", "", predecessor.label + " → " + derived.label +
        " · " + traversal.direction + " traversal"),
      element(documentObject, "span", "", "Evaluate · " + scope.label),
      exactCode(documentObject, traversal.relation),
      exactCode(documentObject, traversal.canonicalSource + " → " +
        traversal.canonicalTarget + " · " + traversal.qualifiers));
      traversals.appendChild(item);
    });
    if (!map.traversals.length) traversals.appendChild(element(documentObject, "li", "", "No admitted traversal."));
    body.appendChild(traversals);
    body.appendChild(element(documentObject, "h4", "", "Closure boundary"));
    var boundaries = element(documentObject, "ul", "");
    map.frontiers.forEach(function (frontier) {
      var item = element(documentObject, "li", "is-frontier");
      item.append(element(documentObject, "strong", "", "Frontier · " + frontier.code),
        element(documentObject, "span", "", frontier.label + " · " + frontier.reason),
        exactCode(documentObject, frontier.artifact));
      boundaries.appendChild(item);
    });
    map.unresolvedRelations.forEach(function (record) {
      var item = element(documentObject, "li", "is-unresolved");
      item.append(element(documentObject, "strong", "", "Unresolved · " + record.code),
        element(documentObject, "span", "", "Needs " + record.predecessorLabel +
          " · " + record.reason), exactCode(documentObject, record.relation));
      boundaries.appendChild(item);
    });
    map.conflicts.forEach(function (conflict) {
      var item = element(documentObject, "li", "is-conflict");
      item.append(element(documentObject, "strong", "", "Conflict · " + conflict.label),
        element(documentObject, "span", "", conflict.reason),
        exactCode(documentObject, conflict.artifact));
      boundaries.appendChild(item);
    });
    map.inactiveExclusions.forEach(function (record) {
      var item = element(documentObject, "li", "is-inactive");
      item.append(element(documentObject, "strong", "", "Inactive exclusion · " + record.label),
        element(documentObject, "span", "", record.reason),
        exactCode(documentObject, record.artifact));
      boundaries.appendChild(item);
    });
    if (!boundaries.children.length) boundaries.appendChild(element(documentObject, "li", "", "No stopped or conflicting boundary record."));
    body.appendChild(boundaries);
    var identity = element(documentObject, "p", "closure-map__identity composition-meta--full");
    identity.append(element(documentObject, "strong", "", "Projected local result "),
      exactCode(documentObject, map.resultSha256));
    body.appendChild(identity);
    details.appendChild(body);
    return details;
  }

  function wrapAudit(documentObject, target) {
    var stages = target.querySelector(":scope > .lab-result__stages");
    var boundary = target.querySelector(":scope > .lab-boundary");
    var draft = target.querySelector(":scope > .lab-draft");
    assert(stages && boundary && draft, "Composition map cannot locate exact stage audit");
    var details = element(documentObject, "details", "closure-map__audit");
    details.appendChild(element(documentObject, "summary", "",
      "Inspect Add · Multiply · Subtract · Evaluate · Stop · Flatten records"));
    var body = element(documentObject, "div", "closure-map__audit-body");
    body.append(stages, boundary, draft);
    details.appendChild(body);
    details.open = documentObject.documentElement.dataset.compositionMetadata === "full";
    Array.from(documentObject.querySelectorAll("[data-composition-profile]")).forEach(function (button) {
      button.addEventListener("click", function () {
        details.open = button.dataset.compositionProfile === "full";
      });
    });
    return details;
  }

  function renderMap(documentObject, target, map) {
    var section = element(documentObject, "section", "closure-map");
    section.id = "composition-closure-map";
    section.append(element(documentObject, "p", "lab-stage__operator", "Map"),
      element(documentObject, "h3", "", "See the admitted closure"),
      element(documentObject, "p", "closure-map__intro",
        "One projection of this identified result. Solid arrows are typed traversals; dashed links mark evaluation ownership or a stopped frontier."));
    var metrics = element(documentObject, "dl", "closure-map__metrics");
    [["Nodes", map.nodes.length], ["Traversals", map.traversals.length],
      ["Frontiers", map.frontiers.length], ["Conflicts", map.conflicts.length],
      ["Unresolved", map.unresolvedRelations.length]].forEach(function (pair) {
      var group = element(documentObject, "div", "");
      group.append(element(documentObject, "dt", "", pair[0]),
        element(documentObject, "dd", "", String(pair[1])));
      metrics.appendChild(group);
    });
    section.appendChild(metrics);
    var legend = element(documentObject, "ul", "closure-map__legend");
    ["Selected", "Required", "Evaluate", "Frontier", "Conflict"].forEach(function (label) {
      legend.appendChild(element(documentObject, "li", "closure-map__legend--" +
        label.toLowerCase(), label));
    });
    section.appendChild(legend);
    var scroll = element(documentObject, "div", "closure-map__scroll");
    scroll.tabIndex = 0;
    scroll.setAttribute("aria-label", "Scrollable closure map");
    scroll.appendChild(renderSvg(documentObject, map,
      "closure-map-svg-title", "closure-map-svg-description"));
    section.appendChild(scroll);
    section.appendChild(renderExactRecords(documentObject, map));
    section.appendChild(element(documentObject, "p", "closure-map__boundary",
      "Display projection only. The exact stage records and linked book pages remain authoritative."));

    var resultMetrics = target.querySelector(":scope > .lab-metrics");
    assert(resultMetrics, "Composition map cannot locate result metrics");
    resultMetrics.after(section);
    var audit = wrapAudit(documentObject, target);
    section.after(audit);
  }

  function renderUnavailable(documentObject, target) {
    if (target.querySelector(".closure-map__error")) return;
    var notice = element(documentObject, "p", "lab-error closure-map__error",
      "Map unavailable. The exact stage records and reading route remain available below.");
    var metrics = target.querySelector(":scope > .lab-metrics");
    if (metrics) metrics.after(notice);
  }

  var api = {
    LAYOUT: LAYOUT,
    validatePayloads: validatePayloads,
    buildClosureMap: buildClosureMap,
    wrapLabel: wrapLabel
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB &&
    root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    try {
      validatePayloads(root.FACTORIUM_COMPOSITION_LAB,
        root.FACTORIUM_COMPOSITION_READING);
      var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
      root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
        previousRenderer(identified);
        var target = root.document.getElementById("composition-lab-result");
        if (!target) return;
        try {
          var map = buildClosureMap(identified.result,
            root.FACTORIUM_COMPOSITION_LAB,
            root.FACTORIUM_COMPOSITION_READING,
            identified.sha256);
          renderMap(root.document, target, map);
        } catch (_) {
          renderUnavailable(root.document, target);
        }
      };
    } catch (_) {
      // The complete base result and reading route remain available.
    }
  }
})(typeof window !== "undefined" ? window : null);
