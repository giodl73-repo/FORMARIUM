use factor::{
    bakeoff::bakeoff_summary,
    corpus::fixture_summary,
    packet::{validate_packet, write_packet},
    role_fixtures::role_fixture_summary,
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

fn usage(message: &str) -> String {
    format!(
        "{message}\nusage:\n  factor check <schema.factor>\n  factor canonicalize <schema.factor>\n  factor fixtures\n  factor role-fixtures\n  factor bakeoff\n  factor packet <output-dir>\n  factor packet-check <packet-dir>"
    )
}
