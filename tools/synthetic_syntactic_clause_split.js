"use strict";

// This is deliberately a small, visible syntax rule. It does not identify
// concepts, infer meaning, add vocabulary, or rank a clause by importance.
const BOUNDARY = /(?:[.!?;]+|\s*,?\s+\b(?:even though|although|but|yet|while)\b\s+)/giu;
const NON_CONTENT = new Set([
  "a", "an", "and", "are", "as", "at", "be", "both", "for", "from", "has",
  "have", "how", "i", "in", "is", "it", "merely", "of", "on", "or", "that",
  "the", "to", "was", "what", "which", "who", "why", "with"
]);

function contentTokenCount(value) {
  return (value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [])
    .filter((token) => !NON_CONTENT.has(token)).length;
}

function splitSyntacticClauses(value) {
  return String(value)
    .replace(/\s+/gu, " ")
    .trim()
    .split(BOUNDARY)
    .map((clause) => clause.replace(/^[\s,.:;!?-]+|[\s,.:;!?-]+$/gu, "").trim())
    .filter((clause) => clause && contentTokenCount(clause) >= 2)
    .slice(0, 3);
}

module.exports = { BOUNDARY, NON_CONTENT, contentTokenCount, splitSyntacticClauses };
