#!/usr/bin/env python3
"""Independent standard-library verifier for FACTOR role packet v1."""

from __future__ import annotations

import hashlib
import pathlib
import sys


FAMILIES = ("transfer", "attachment")
EXACT_OWNERS = {
    "typed-record",
    "sparse-tpr",
    "factored-one-hot",
    "factored-dense",
}
BINDING_OWNERS = EXACT_OWNERS | {"hrr-64", "hrr-128", "hrr-256"}
BAKEOFF_OWNERS = BINDING_OWNERS | {"whole-meaning", "whole-analysis-set"}
SYSTEMATIC_SPLITS = {
    ("transfer", "slot-recombination"),
    ("transfer", "shared-filler"),
    ("attachment", "object-recombination"),
}


def fail(message: str) -> None:
    raise SystemExit(f"factor role packet: {message}")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_lf(path: pathlib.Path) -> bytes:
    data = path.read_bytes()
    if b"\r" in data:
        fail(f"{path}: noncanonical carriage return")
    try:
        data.decode("ascii")
    except UnicodeDecodeError:
        fail(f"{path}: non-ASCII bytes")
    return data


def parse_manifest(
    root: pathlib.Path,
) -> tuple[dict[str, str], dict[str, tuple[int, str]]]:
    data = read_lf(root / "MANIFEST.factor")
    lines = data.decode("ascii").splitlines()
    if not lines or lines[0] != "factor-role-packet-v1":
        fail("invalid manifest header")
    fields: dict[str, str] = {}
    files: dict[str, tuple[int, str]] = {}
    for line in lines[1:]:
        parts = line.split()
        if not parts:
            fail("blank manifest record")
        if parts[0] == "file":
            if len(parts) != 6 or parts[2] != "bytes" or parts[4] != "sha256":
                fail(f"malformed file record: {line}")
            relative = parts[1]
            candidate = pathlib.PurePosixPath(relative)
            if candidate.is_absolute() or ".." in candidate.parts:
                fail(f"unsafe file path: {relative}")
            if relative in files:
                fail(f"duplicate file record: {relative}")
            files[relative] = (int(parts[3]), parts[5])
        else:
            key = " ".join(parts[:-1])
            if key in fields:
                fail(f"duplicate manifest field: {key}")
            fields[key] = parts[-1]
    return fields, files


def verify_files(root: pathlib.Path, files: dict[str, tuple[int, str]]) -> None:
    actual = {
        path.relative_to(root).as_posix()
        for path in root.rglob("*")
        if path.is_file()
    }
    expected = set(files) | {"MANIFEST.factor"}
    if actual != expected:
        fail(f"closed-world file mismatch: expected {sorted(expected)}, got {sorted(actual)}")
    for relative, (size, digest) in files.items():
        data = read_lf(root / pathlib.PurePosixPath(relative))
        if len(data) != size:
            fail(f"{relative}: byte count mismatch")
        if sha256(data) != digest:
            fail(f"{relative}: sha256 mismatch")


def schema_digest(data: bytes) -> str:
    marker = b"meaning "
    offset = data.find(marker)
    declarations = data if offset < 0 else data[:offset]
    return sha256(declarations)


def parse_key_lines(data: bytes) -> dict[str, str]:
    result: dict[str, str] = {}
    for line in data.decode("ascii").splitlines():
        parts = line.split()
        if len(parts) == 2:
            result[parts[0]] = parts[1]
    return result


def verify_custody(
    root: pathlib.Path, fields: dict[str, str]
) -> tuple[
    dict[str, set[str]],
    dict[str, dict[str, tuple[str, tuple[str, ...]]]],
    dict[tuple[str, str], tuple[list[tuple[str, str]], list[tuple[str, str]]]],
]:
    schema_ids: dict[str, str] = {}
    frame_ids: dict[str, str] = {}
    corpus_ids: dict[str, str] = {}
    analysis_ids: dict[str, str] = {}
    meanings_by_family: dict[str, set[str]] = {}
    surfaces_by_family: dict[str, dict[str, tuple[str, tuple[str, ...]]]] = {}

    for family in FAMILIES:
        data = read_lf(root / "schemas" / f"{family}.factor")
        digest = schema_digest(data)
        if fields.get(f"schema {family}") != digest:
            fail(f"{family}: schema identity mismatch")
        schema_ids[family] = digest

        frame_data = read_lf(root / "frames" / f"{family}.factor-role-frame")
        frame_lines = frame_data.decode("ascii").splitlines()
        if not frame_lines or frame_lines[0] != "factor-role-frame-v1":
            fail(f"{family}: invalid role frame")
        if frame_lines[1] != f"frame {family} version 1":
            fail(f"{family}: frame identity mismatch")
        required_frame_lines = (
            {
                "domain entity",
                "domain theme",
                "role giver",
                "role recipient",
                "slot primary factor recipient-primary domain entity",
                "slot secondary factor recipient-secondary domain entity",
                "role theme",
            }
            if family == "transfer"
            else {
                "domain entity",
                "domain object",
                "role instrument",
                "role observer",
                "role patient",
                "role patient-associated-object",
                "constraint exactly-one-non-none instrument patient-associated-object",
            }
        )
        if not required_frame_lines.issubset(frame_lines):
            fail(f"{family}: incomplete role frame")
        frame_fields = parse_key_lines(frame_data)
        if frame_fields.get("schema_sha256") != schema_ids[family]:
            fail(f"{family}: frame/schema custody mismatch")
        frame_ids[family] = sha256(frame_data)
        if fields.get(f"frame {family}") != frame_ids[family]:
            fail(f"{family}: frame digest mismatch")

        corpus_data = read_lf(
            root / "corpora" / f"{family}.factor-role-corpus"
        )
        lines = corpus_data.decode("ascii").splitlines()
        if not lines or lines[0] != "factor-role-corpus-v1":
            fail(f"{family}: invalid corpus")
        corpus_fields = parse_key_lines(corpus_data)
        if corpus_fields.get("family") != family:
            fail(f"{family}: corpus family mismatch")
        if corpus_fields.get("schema_sha256") != schema_ids[family]:
            fail(f"{family}: corpus/schema custody mismatch")
        if corpus_fields.get("frame_sha256") != frame_ids[family]:
            fail(f"{family}: corpus/frame custody mismatch")
        meanings: set[str] = set()
        for line in lines:
            parts = line.split()
            if parts and parts[0] == "meaning":
                if len(parts) < 4 or parts[2] != "ordinals":
                    fail(f"{family}: malformed meaning")
                if parts[1] in meanings:
                    fail(f"{family}: duplicate meaning {parts[1]}")
                tuple(int(value) for value in parts[3:])
                meanings.add(parts[1])
        if int(corpus_fields.get("meanings", "-1")) != len(meanings):
            fail(f"{family}: meaning denominator mismatch")
        corpus_ids[family] = sha256(corpus_data)
        if fields.get(f"corpus {family}") != corpus_ids[family]:
            fail(f"{family}: corpus digest mismatch")
        meanings_by_family[family] = meanings

        analysis_data = read_lf(
            root / "analyses" / f"{family}.factor-analysis"
        )
        lines = analysis_data.decode("ascii").splitlines()
        if not lines or lines[0] != "factor-analysis-sets-v1":
            fail(f"{family}: invalid analysis document")
        if lines[1] != f"analysis {family} version 1":
            fail(f"{family}: analysis family mismatch")
        analysis_fields = parse_key_lines(analysis_data)
        if analysis_fields.get("frame_sha256") != frame_ids[family]:
            fail(f"{family}: analysis/frame custody mismatch")
        if analysis_fields.get("corpus_sha256") != corpus_ids[family]:
            fail(f"{family}: analysis/corpus custody mismatch")
        surfaces: dict[str, tuple[str, tuple[str, ...]]] = {}
        current_family: str | None = None
        index = 2
        while index < len(lines):
            parts = lines[index].split()
            if parts and parts[0] == "family":
                current_family = parts[1]
            elif parts and parts[0] == "surface":
                if current_family is None or len(parts) != 2:
                    fail(f"{family}: surface outside analysis family")
                surface_id = parts[1]
                if surface_id in surfaces:
                    fail(f"{family}: duplicate surface {surface_id}")
                candidates: list[str] = []
                declared_candidates: int | None = None
                saw_template = False
                saw_text = False
                index += 1
                while index < len(lines) and lines[index] != "end-surface":
                    candidate_parts = lines[index].split()
                    if candidate_parts and candidate_parts[0] == "template":
                        saw_template = True
                    elif candidate_parts and candidate_parts[0] == "text":
                        saw_text = True
                    elif candidate_parts and candidate_parts[0] == "candidates":
                        declared_candidates = int(candidate_parts[1])
                    elif candidate_parts and candidate_parts[0] == "candidate":
                        candidates.append(candidate_parts[1])
                    index += 1
                if (
                    not saw_template
                    or not saw_text
                    or declared_candidates != len(candidates)
                ):
                    fail(f"{family}: incomplete surface {surface_id}")
                if not candidates or candidates != sorted(set(candidates)):
                    fail(f"{family}: noncanonical candidates for {surface_id}")
                if not set(candidates).issubset(meanings):
                    fail(f"{family}: unknown candidate for {surface_id}")
                surfaces[surface_id] = (current_family, tuple(candidates))
            index += 1
        analysis_ids[family] = sha256(analysis_data)
        if fields.get(f"analysis {family}") != analysis_ids[family]:
            fail(f"{family}: analysis digest mismatch")
        surfaces_by_family[family] = surfaces

    split_refs: dict[
        tuple[str, str], tuple[list[tuple[str, str]], list[tuple[str, str]]]
    ] = {}
    for path in sorted((root / "splits").glob("*.factor-analysis-split")):
        data = read_lf(path)
        lines = data.decode("ascii").splitlines()
        if not lines or lines[0] != "factor-analysis-split-v1":
            fail(f"{path}: invalid split")
        split_fields = parse_key_lines(data)
        family = split_fields["family"]
        kind = split_fields["kind"]
        if family not in FAMILIES:
            fail(f"{path}: unknown family")
        if split_fields.get("corpus_sha256") != corpus_ids[family]:
            fail(f"{family} {kind}: split/corpus custody mismatch")
        if split_fields.get("analysis_sha256") != analysis_ids[family]:
            fail(f"{family} {kind}: split/analysis custody mismatch")
        if fields.get(f"split {family} {kind}") != sha256(data):
            fail(f"{family} {kind}: split digest mismatch")
        train: list[tuple[str, str]] = []
        test: list[tuple[str, str]] = []
        for line in lines:
            parts = line.split()
            if len(parts) == 3 and parts[0] in {"train", "test"}:
                reference = (parts[1], parts[2])
                surface = surfaces_by_family[family].get(parts[2])
                if surface is None or surface[0] != parts[1]:
                    fail(f"{family} {kind}: unknown analysis reference")
                (train if parts[0] == "train" else test).append(reference)
        if len(train) != int(split_fields["train"]) or len(test) != int(
            split_fields["test"]
        ):
            fail(f"{family} {kind}: split denominator mismatch")
        if len(set(train + test)) != len(train) + len(test):
            fail(f"{family} {kind}: duplicate or shared surface reference")
        train_families = {item[0] for item in train}
        test_families = {item[0] for item in test}
        train_candidates = {
            candidate
            for _, surface_id in train
            for candidate in surfaces_by_family[family][surface_id][1]
        }
        test_candidates = {
            candidate
            for _, surface_id in test
            for candidate in surfaces_by_family[family][surface_id][1]
        }
        if kind == "surface-disambiguation":
            if split_fields.get("candidate_overlap") != "true":
                fail(f"{family} {kind}: overlap declaration mismatch")
            if any(
                len(surfaces_by_family[family][surface_id][1]) != 1
                for _, surface_id in train
            ) or any(
                len(surfaces_by_family[family][surface_id][1]) != 2
                for _, surface_id in test
            ):
                fail(f"{family} {kind}: wrong candidate-set shape")
            if train_candidates != test_candidates:
                fail(f"{family} {kind}: candidate transfer mismatch")
        else:
            if split_fields.get("candidate_overlap") != "false":
                fail(f"{family} {kind}: overlap declaration mismatch")
            if train_families & test_families:
                fail(f"{family} {kind}: analysis-family leakage")
            if train_candidates & test_candidates:
                fail(f"{family} {kind}: candidate leakage")
        split_refs[(family, kind)] = (train, test)

    expected_splits = {
        ("transfer", "iid"),
        ("transfer", "slot-recombination"),
        ("transfer", "shared-filler"),
        ("attachment", "iid"),
        ("attachment", "object-recombination"),
        ("attachment", "surface-disambiguation"),
    }
    if set(split_refs) != expected_splits:
        fail("split suite mismatch")
    return meanings_by_family, surfaces_by_family, split_refs


def ratio(value: str) -> tuple[int, int]:
    left, right = value.split("/", 1)
    return int(left), int(right)


def triple(value: str) -> tuple[int, int, int]:
    first, second, third = value.split("/", 2)
    return int(first), int(second), int(third)


def key_values(parts: list[str], start: int) -> dict[str, str]:
    values = parts[start:]
    if len(values) % 2:
        fail(f"malformed key/value record: {' '.join(parts)}")
    return dict(zip(values[::2], values[1::2]))


def verify_binding_result(
    root: pathlib.Path,
    fields: dict[str, str],
    meanings_by_family: dict[str, set[str]],
) -> None:
    data = read_lf(root / "results" / "binding-controls.factor-result")
    if fields.get("result binding-controls") != sha256(data):
        fail("binding result identity mismatch")
    lines = data.decode("ascii").splitlines()
    expected_header = [
        "factor-binding-controls-v1",
        "hrr_seed 464143544f522d32",
        "hrr_dimensions 64 128 256",
        "hrr_decision_owner 256",
        "hrr_binding circular-convolution",
        "hrr_unbinding involution",
        "hrr_cleanup nearest-cosine-domain",
        "runtime descriptive-excluded",
    ]
    if lines[:8] != expected_header:
        fail("binding configuration mismatch")
    records: dict[tuple[str, str], dict[str, str]] = {}
    for line in lines[8:]:
        parts = line.split()
        if not parts or parts[0] != "record" or len(parts) < 5:
            fail("malformed binding record")
        key = (parts[1], parts[2])
        if key in records:
            fail(f"duplicate binding record: {key}")
        records[key] = key_values(parts, 3)
    expected_keys = {
        (family, representation)
        for family in FAMILIES
        for representation in BINDING_OWNERS
    }
    if set(records) != expected_keys:
        fail("binding owner matrix mismatch")
    for (family, representation), record in records.items():
        exact = ratio(record["exact"])
        roles = ratio(record["roles"])
        meanings = len(meanings_by_family[family])
        if exact[1] != meanings or roles[1] != meanings * 4:
            fail(f"{family} {representation}: binding denominator mismatch")
        for cost in (
            "logical_bits",
            "dimensions",
            "container_bytes",
            "metadata_bytes",
            "parameter_bits",
            "temporary_bytes",
        ):
            if int(record[cost]) < 0:
                fail(f"{family} {representation}: negative {cost}")
        if representation in EXACT_OWNERS | {"hrr-128", "hrr-256"}:
            if exact[0] != exact[1] or roles[0] != roles[1]:
                fail(f"{family} {representation}: declared strong control failed")
        elif exact[0] >= exact[1] or roles[0] >= roles[1]:
            fail(f"{family} hrr-64: retained interference failure missing")


def score_denominators(
    family: str,
    references: list[tuple[str, str]],
    surfaces: dict[str, dict[str, tuple[str, tuple[str, ...]]]],
) -> tuple[int, int, int]:
    sets = len(references)
    candidates = sum(
        len(surfaces[family][surface_id][1]) for _, surface_id in references
    )
    return sets, candidates, candidates * 4


def perfect_record(
    record: dict[str, str], set_total: int, candidate_total: int, role_total: int
) -> bool:
    return (
        ratio(record["sets"]) == (set_total, set_total)
        and triple(record["candidates"])
        == (candidate_total, candidate_total, candidate_total)
        and ratio(record["meanings"]) == (candidate_total, candidate_total)
        and ratio(record["roles"]) == (role_total, role_total)
    )


def verify_bakeoff_result(
    root: pathlib.Path,
    fields: dict[str, str],
    surfaces: dict[str, dict[str, tuple[str, tuple[str, ...]]]],
    split_refs: dict[
        tuple[str, str], tuple[list[tuple[str, str]], list[tuple[str, str]]]
    ],
) -> None:
    data = read_lf(root / "results" / "role-ambiguity.factor-result")
    if fields.get("result role-ambiguity") != sha256(data):
        fail("role bakeoff identity mismatch")
    lines = data.decode("ascii").splitlines()
    if lines[:3] != [
        "factor-role-bakeoff-v1",
        "hrr_decision_owner 256",
        "runtime descriptive-excluded",
    ]:
        fail("role bakeoff header mismatch")
    records: dict[tuple[str, str, str], dict[str, str]] = {}
    decision: dict[str, str] | None = None
    for line in lines[3:]:
        parts = line.split()
        if parts[0] == "record":
            values = key_values(parts, 4)
            key = (parts[1], parts[2], parts[3])
            if key in records:
                fail(f"duplicate role bakeoff record: {key}")
            records[key] = values
        elif parts[0] == "decision":
            decision = key_values(parts, 1)
        else:
            fail("malformed role bakeoff record")
    expected_keys = {
        (family, split, representation)
        for family, split in split_refs
        for representation in BAKEOFF_OWNERS
    }
    if set(records) != expected_keys:
        fail("role bakeoff matrix mismatch")

    for (family, split, representation), record in records.items():
        train_refs, test_refs = split_refs[(family, split)]
        train_sets, train_candidates, train_roles = score_denominators(
            family, train_refs, surfaces
        )
        test_sets, test_candidates, test_roles = score_denominators(
            family, test_refs, surfaces
        )
        train_view = {
            "sets": record["train_sets"],
            "candidates": record["train_candidates"],
            "meanings": record["train_meanings"],
            "roles": record["train_roles"],
        }
        test_view = {
            "sets": record["test_sets"],
            "candidates": record["test_candidates"],
            "meanings": record["test_meanings"],
            "roles": record["test_roles"],
        }
        if ratio(train_view["sets"])[1] != train_sets:
            fail(f"{family} {split} {representation}: train set denominator")
        if triple(train_view["candidates"])[2] != train_candidates:
            fail(f"{family} {split} {representation}: train candidate denominator")
        if ratio(train_view["meanings"])[1] != train_candidates:
            fail(f"{family} {split} {representation}: train meaning denominator")
        if ratio(train_view["roles"])[1] != train_roles:
            fail(f"{family} {split} {representation}: train role denominator")
        if ratio(test_view["sets"])[1] != test_sets:
            fail(f"{family} {split} {representation}: test set denominator")
        if triple(test_view["candidates"])[2] != test_candidates:
            fail(f"{family} {split} {representation}: test candidate denominator")
        if ratio(test_view["meanings"])[1] != test_candidates:
            fail(f"{family} {split} {representation}: test meaning denominator")
        if ratio(test_view["roles"])[1] != test_roles:
            fail(f"{family} {split} {representation}: test role denominator")
        for cost in (
            "edit_milli",
            "logical_bits",
            "dimensions",
            "container_bytes",
            "metadata_bytes",
            "parameter_bits",
            "temporary_bytes",
        ):
            if int(record[cost]) < 0:
                fail(f"{family} {split} {representation}: negative {cost}")

        if representation in EXACT_OWNERS:
            if not perfect_record(
                train_view, train_sets, train_candidates, train_roles
            ) or not perfect_record(test_view, test_sets, test_candidates, test_roles):
                fail(f"{family} {split} {representation}: exact control failed")
        if representation == "hrr-256" and (
            not perfect_record(train_view, train_sets, train_candidates, train_roles)
            or not perfect_record(test_view, test_sets, test_candidates, test_roles)
        ):
            fail(f"{family} {split}: frozen HRR owner failed")
        if (family, split) in SYSTEMATIC_SPLITS and representation in {
            "whole-meaning",
            "whole-analysis-set",
        }:
            if ratio(test_view["sets"])[0] != 0:
                fail(f"{family} {split} {representation}: deletion target passed")

    disambiguation = ("attachment", "surface-disambiguation")
    train_refs, test_refs = split_refs[disambiguation]
    test_sets, test_candidates, test_roles = score_denominators(
        "attachment", test_refs, surfaces
    )
    whole_meaning = records[(*disambiguation, "whole-meaning")]
    whole_set = records[(*disambiguation, "whole-analysis-set")]
    whole_meaning_view = {
        "sets": whole_meaning["test_sets"],
        "candidates": whole_meaning["test_candidates"],
        "meanings": whole_meaning["test_meanings"],
        "roles": whole_meaning["test_roles"],
    }
    if not perfect_record(
        whole_meaning_view, test_sets, test_candidates, test_roles
    ):
        fail("whole-meaning familiar-candidate transfer failed")
    if ratio(whole_set["test_sets"])[0] != 0:
        fail("whole-analysis-set deletion target passed")
    if train_refs == test_refs:
        fail("surface disambiguation reused surfaces")

    expected_decision = {
        "role_factorization_useful": "true",
        "ambiguity_composition_useful": "true",
        "strong_controls_tie": "true",
        "representation_specific": "false",
        "classification": "semantic-only",
    }
    if decision != expected_decision:
        fail(f"decision mismatch: {decision}")
    if fields.get("classification") != decision["classification"]:
        fail("manifest/result classification mismatch")


def main() -> None:
    if len(sys.argv) != 2:
        fail("usage: verify_role_packet.py PACKET_DIR")
    root = pathlib.Path(sys.argv[1]).resolve()
    fields, files = parse_manifest(root)
    if fields.get("packet") != "factor-role-v1":
        fail("packet identifier mismatch")
    if fields.get("model") != "exact-and-hrr-v1-d64-128-256":
        fail("model identifier mismatch")
    if fields.get("producer factor") != "0.1.0":
        fail("producer version mismatch")
    producer_digest = fields.get("producer_source_sha256", "")
    if len(producer_digest) != 64 or any(
        character not in "0123456789abcdef" for character in producer_digest
    ):
        fail("producer source identity mismatch")
    verify_files(root, files)
    meanings, surfaces, split_refs = verify_custody(root, fields)
    verify_binding_result(root, fields, meanings)
    verify_bakeoff_result(root, fields, surfaces, split_refs)
    manifest_sha = sha256(read_lf(root / "MANIFEST.factor"))
    print(f"packet_sha256={manifest_sha}")
    print("classification=semantic-only")
    print("verification=independent-pass")


if __name__ == "__main__":
    main()
