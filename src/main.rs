use factor::SchemaDocument;
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
    let path = arguments.next().ok_or_else(|| usage("missing path"))?;
    if arguments.next().is_some() {
        return Err(usage("unexpected extra argument"));
    }

    let input = fs::read_to_string(&path).map_err(|error| format!("{path}: {error}"))?;
    let document = SchemaDocument::parse(&input).map_err(|error| format!("{path}: {error}"))?;

    match command.as_str() {
        "check" => {
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
            print!("{}", document.canonical_text());
            Ok(())
        }
        _ => Err(usage("unknown command")),
    }
}

fn usage(message: &str) -> String {
    format!("{message}\nusage: factor <check|canonicalize> <schema.factor>")
}
