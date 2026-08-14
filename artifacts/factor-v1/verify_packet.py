#!/usr/bin/env python3
"""Independent standard-library verifier for FACTOR portable packet v1."""

from __future__ import annotations

import hashlib
import pathlib
import sys


FACTOR_REPRESENTATIONS = {
    "product-state",
    "packed-features",
    "typed-feature-structure",
    "factored-one-hot",
    "factored-dense",
}
WHOLE_REPRESENTATIONS = {"whole-one-hot", "whole-dense"}
SYSTEMATIC_SPLITS = {"lexical", "cross-feature"}


def fail(message: str) -> None:
    raise SystemExit(f"factor packet: {message}")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_lf(path: pathlib.Path) -> bytes:
    data = path.read_bytes()
    if b"\r" in data:
        fail(f"{path}: noncanonical carriage return")
    return data


def parse_manifest(root: pathlib.Path) -> tuple[dict[str, str], dict[str, tuple[int, str]]]:
    manifest_path = root / "MANIFEST.factor"
    data = read_lf(manifest_path)
    lines = data.decode("ascii").splitlines()
    if not lines or lines[0] != "factor-packet-v1":
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


def parse_corpus(data: bytes) -> tuple[str, str, set[str], set[str]]:
    lines = data.decode("ascii").splitlines()
    if not lines or lines[0] != "factor-corpus-v1":
        fail("invalid corpus header")
    family = lines[1].split()[1]
    schema = lines[4].split()[1]
    meanings: set[str] = set()
    surfaces: set[str] = set()
    for line in lines:
        parts = line.split()
        if parts and parts[0] == "meaning":
            meanings.add(parts[1])
        elif parts and parts[0] == "surface":
            surfaces.add(parts[1])
    return family, schema, meanings, surfaces


def verify_custody(root: pathlib.Path, fields: dict[str, str]) -> None:
    schema_ids = {}
    for family in ("navigation", "event"):
        data = read_lf(root / "schemas" / f"{family}.factor")
        digest = schema_digest(data)
        if fields.get(f"schema {family}") != digest:
            fail(f"{family}: schema identity mismatch")
        schema_ids[family] = digest

    corpora = {}
    for family in ("navigation", "event"):
        path = root / "corpora" / f"{family}.factor-corpus"
        data = read_lf(path)
        parsed_family, schema, meanings, surfaces = parse_corpus(data)
        if parsed_family != family or schema != schema_ids[family]:
            fail(f"{family}: corpus custody chain mismatch")
        if fields.get(f"corpus {family}") != sha256(data):
            fail(f"{family}: corpus identity mismatch")
        corpora[family] = (meanings, surfaces)

    for path in sorted((root / "splits").glob("*.factor-split")):
        data = read_lf(path)
        lines = data.decode("ascii").splitlines()
        if not lines or lines[0] != "factor-split-v1":
            fail(f"{path}: invalid split header")
        family = lines[1].split()[1]
        kind = lines[2].split()[1]
        schema = lines[5].split()[1]
        corpus = lines[6].split()[1]
        if schema != schema_ids[family] or corpus != fields.get(f"corpus {family}"):
            fail(f"{family} {kind}: split custody chain mismatch")
        if fields.get(f"split {family} {kind}") != sha256(data):
            fail(f"{family} {kind}: split identity mismatch")
        meanings, surfaces = corpora[family]
        for line in lines:
            parts = line.split()
            if len(parts) == 3 and parts[0] in {"train", "test"}:
                if parts[1] not in meanings or parts[2] not in surfaces:
                    fail(f"{family} {kind}: unknown example reference")


def ratio(value: str) -> tuple[int, int]:
    left, right = value.split("/", 1)
    return int(left), int(right)


def verify_result(root: pathlib.Path, fields: dict[str, str]) -> None:
    data = read_lf(root / "results" / "strong-control.factor-result")
    if fields.get("result strong-control") != sha256(data):
        fail("result identity mismatch")
    lines = data.decode("ascii").splitlines()
    if lines[0] != "factor-bakeoff-v1":
        fail("invalid result header")

    records = {}
    for line in lines:
        parts = line.split()
        if parts and parts[0] == "record":
            family, split, representation = parts[1:4]
            records[(family, split, representation)] = parts
        elif parts and parts[0] == "decision":
            decision = dict(zip(parts[1::2], parts[2::2]))

    for family in ("navigation", "event"):
        for split in ("iid", "lexical", "cross-feature"):
            product = records[(family, split, "product-state")]
            packed = records[(family, split, "packed-features")]
            if product[4:] != packed[4:]:
                fail(f"{family} {split}: product/packed alias divergence")

    for (family, split, representation), parts in records.items():
        test = ratio(parts[7])
        if split in SYSTEMATIC_SPLITS:
            if representation in FACTOR_REPRESENTATIONS and test[0] != test[1]:
                fail(f"{family} {split} {representation}: factor control failed")
            if representation in WHOLE_REPRESENTATIONS and test[0] != 0:
                fail(f"{family} {split} {representation}: whole control received test meaning")
        if split == "template-transfer" and test[0] != test[1]:
            fail(f"{family} {split} {representation}: transfer negative control failed")

    expected = {
        "factorization_useful": "true",
        "representation_specific": "false",
        "strong_controls_tie": "true",
        "classification": "semantic-only",
    }
    if decision != expected:
        fail(f"decision mismatch: {decision}")
    if fields.get("classification") != decision["classification"]:
        fail("manifest/result classification mismatch")


def main() -> None:
    if len(sys.argv) != 2:
        fail("usage: verify_packet.py PACKET_DIR")
    root = pathlib.Path(sys.argv[1]).resolve()
    fields, files = parse_manifest(root)
    verify_files(root, files)
    verify_custody(root, fields)
    verify_result(root, fields)
    manifest_sha = sha256(read_lf(root / "MANIFEST.factor"))
    print(f"packet_sha256={manifest_sha}")
    print("classification=semantic-only")
    print("verification=independent-pass")


if __name__ == "__main__":
    main()
