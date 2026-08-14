use factor::{
    bakeoff::bakeoff_summary,
    binding::binding_control_summary,
    corpus::fixture_summary,
    packet::{validate_packet, write_packet},
    reference::ReferenceCorpus,
    role_bakeoff::role_bakeoff_summary,
    role_fixtures::role_fixture_summary,
    role_packet::{validate_role_packet, write_role_packet},
    SchemaDocument,
};
use std::env;
use std::fs;
use std::process::ExitCode;

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(error) => {
            eprintln!("factor: {error}");
            ExitCode::FAILURE
        }
    }
}

fn run() -> Result<(), String> {
    let mut arguments = env::args().skip(1);
    let command = arguments.next().ok_or_else(|| usage("missing command"))?;

    match command.as_str() {
        "bakeoff" => {
            if arguments.next().is_some() {
                return Err(usage("bakeoff accepts no path"));
            }
            print!("{}", bakeoff_summary().map_err(|error| error.to_string())?);
            Ok(())
        }
        "binding-controls" => {
            if arguments.next().is_some() {
                return Err(usage("binding-controls accepts no path"));
            }
            print!("{}", binding_control_summary());
            Ok(())
        }
        "fixtures" => {
            if arguments.next().is_some() {
                return Err(usage("fixtures accepts no path"));
            }
            print!("{}", fixture_summary().map_err(|error| error.to_string())?);
            Ok(())
        }
        "packet" => {
            let path = read_path(&mut arguments)?;
            let packet = write_packet(path.as_ref()).map_err(|error| error.to_string())?;
            println!("packet={path}");
            println!("files={}", packet.files().len() + 1);
            println!("packet_sha256={}", packet.sha256());
            Ok(())
        }
        "packet-check" => {
            let path = read_path(&mut arguments)?;
            let identity = validate_packet(path.as_ref()).map_err(|error| error.to_string())?;
            println!("packet={path}");
            println!("packet_sha256={identity}");
            Ok(())
        }
        "role-fixtures" => {
            if arguments.next().is_some() {
                return Err(usage("role-fixtures accepts no path"));
            }
            print!(
                "{}",
                role_fixture_summary().map_err(|error| error.to_string())?
            );
            Ok(())
        }
        "role-bakeoff" => {
            if arguments.next().is_some() {
                return Err(usage("role-bakeoff accepts no path"));
            }
            print!("{}", role_bakeoff_summary());
            Ok(())
        }
        "role-packet" => {
            let path = read_path(&mut arguments)?;
            let packet = write_role_packet(path.as_ref()).map_err(|error| error.to_string())?;
            println!("packet={path}");
            println!("files={}", packet.files().len() + 1);
            println!("packet_sha256={}", packet.sha256());
            Ok(())
        }
        "role-packet-check" => {
            let path = read_path(&mut arguments)?;
            let identity =
                validate_role_packet(path.as_ref()).map_err(|error| error.to_string())?;
            println!("packet={path}");
            println!("packet_sha256={identity}");
            Ok(())
        }
        "reference-check" | "reference-catalog" | "reference-unresolved" | "reference-sync" => {
            run_reference_command(command.as_str(), &mut arguments)
        }
        "check" => {
            let (_, document) = read_document(&mut arguments)?;
            println!("schema={}", document.schema().id());
            println!("version={}", document.schema().version());
            println!("factors={}", document.schema().factors().len());
            println!("meanings={}", document.meanings().len());
            println!("logical_bits={}", document.schema().logical_bits());
            println!("schema_sha256={}", document.schema().sha256());
            println!("document_sha256={}", document.document_sha256());
            Ok(())
        }
        "canonicalize" => {
            let (_, document) = read_document(&mut arguments)?;
            print!("{}", document.canonical_text());
            Ok(())
        }
        _ => Err(usage("unknown command")),
    }
}

fn run_reference_command(
    command: &str,
    arguments: &mut impl Iterator<Item = String>,
) -> Result<(), String> {
    let (manifest, root) = read_two_paths(arguments)?;
    let corpus = read_reference(&manifest)?;
    match command {
        "reference-check" => {
            corpus
                .validate_projections(root.as_ref())
                .map_err(|error| format!("{manifest}: {error}"))?;
            println!("reference={manifest}");
            println!("entries={}", corpus.entries().len());
            println!(
                "aliases={}",
                corpus
                    .entries()
                    .iter()
                    .map(|entry| entry.aliases().len())
                    .sum::<usize>()
            );
            println!(
                "senses={}",
                corpus
                    .entries()
                    .iter()
                    .map(|entry| entry.senses().len())
                    .sum::<usize>()
            );
            println!(
                "factors={}",
                corpus
                    .entries()
                    .iter()
                    .map(|entry| entry.factors().len())
                    .sum::<usize>()
            );
            println!("views={}", corpus.views().len());
            println!(
                "unresolved_view_owners={}",
                corpus
                    .views()
                    .iter()
                    .filter(|view| view.entry_id().starts_with("unresolved-"))
                    .count()
            );
            println!("reference_sha256={}", corpus.sha256());
        }
        "reference-catalog" => {
            corpus
                .validate_workspace(root.as_ref())
                .map_err(|error| format!("{manifest}: {error}"))?;
            print!("{}", corpus.catalog_markdown());
        }
        "reference-unresolved" => {
            corpus
                .validate_workspace(root.as_ref())
                .map_err(|error| format!("{manifest}: {error}"))?;
            print!(
                "{}",
                corpus
                    .unresolved_markdown(root.as_ref())
                    .map_err(|error| format!("{manifest}: {error}"))?
            );
        }
        "reference-sync" => {
            corpus
                .sync_projections(root.as_ref())
                .map_err(|error| format!("{manifest}: {error}"))?;
            println!("reference={manifest}");
            println!("catalog={root}\\tables\\CATALOG.md");
            println!("formula_catalog={root}\\tables\\formulas\\INDEX.md");
            println!("unresolved={root}\\tables\\UNRESOLVED.md");
            println!("reference_sha256={}", corpus.sha256());
        }
        _ => return Err(usage("unknown reference command")),
    }
    Ok(())
}

fn read_document(
    arguments: &mut impl Iterator<Item = String>,
) -> Result<(String, SchemaDocument), String> {
    let path = arguments.next().ok_or_else(|| usage("missing path"))?;
    if arguments.next().is_some() {
        return Err(usage("unexpected extra argument"));
    }
    let input = fs::read_to_string(&path).map_err(|error| format!("{path}: {error}"))?;
    let document = SchemaDocument::parse(&input).map_err(|error| format!("{path}: {error}"))?;
    Ok((path, document))
}

fn read_path(arguments: &mut impl Iterator<Item = String>) -> Result<String, String> {
    let path = arguments.next().ok_or_else(|| usage("missing path"))?;
    if arguments.next().is_some() {
        return Err(usage("unexpected extra argument"));
    }
    Ok(path)
}

fn read_two_paths(
    arguments: &mut impl Iterator<Item = String>,
) -> Result<(String, String), String> {
    let first = arguments
        .next()
        .ok_or_else(|| usage("missing manifest path"))?;
    let second = arguments
        .next()
        .ok_or_else(|| usage("missing workspace root"))?;
    if arguments.next().is_some() {
        return Err(usage("unexpected extra argument"));
    }
    Ok((first, second))
}

fn read_reference(path: &str) -> Result<ReferenceCorpus, String> {
    let input = fs::read_to_string(path).map_err(|error| format!("{path}: {error}"))?;
    ReferenceCorpus::parse(&input).map_err(|error| format!("{path}: {error}"))
}

fn usage(message: &str) -> String {
    format!(
        "{message}\nusage:\n  factor check <schema.factor>\n  factor canonicalize <schema.factor>\n  factor fixtures\n  factor role-fixtures\n  factor binding-controls\n  factor role-bakeoff\n  factor role-packet <output-dir>\n  factor role-packet-check <packet-dir>\n  factor bakeoff\n  factor packet <output-dir>\n  factor packet-check <packet-dir>\n  factor reference-check <manifest> <workspace-root>\n  factor reference-catalog <manifest> <workspace-root>\n  factor reference-unresolved <manifest> <workspace-root>\n  factor reference-sync <manifest> <workspace-root>"
    )
}
