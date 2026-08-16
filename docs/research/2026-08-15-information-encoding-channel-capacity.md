# Information, Encoding, Channel, and Capacity Research Note

Date: 2026-08-15
Status: source-grounded candidate synthesis

## Finding

The reusable ladder is:

```text
source object + versioned mapping -> encoded representation
channel input + conditional law + state -> channel output
joint input-output model -> mutual information
fixed channel + admissible input class -> optimized mutual information -> capacity
```

These concepts occupy different layers. Encoding is a directional mapping with
a source space, representation space, version, decoder, and loss contract; it
does not supply meaning. A channel is an input-output transition model, not
merely a cable, protocol, or medium. Mutual information measures statistical
dependence in a joint probability model, not causal direction or semantic
agreement. Channel capacity optimizes information over admitted inputs for a
fixed channel and constraint set; it is neither one input distribution's value
nor an observed throughput.

Named formats, codes, protocols, media, and channel families remain examples or
external taxonomies. The canon owns mapping direction and version, alphabets or
object spaces, decoding and round-trip status, channel law and memory, input
constraints, estimator and sample, logarithm base, rate normalization, error
criterion, and coding regime.

## Sources

1. Claude Shannon, *A Mathematical Theory of Communication* (1948): https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
2. ITU-T X.209, *Specification of Basic Encoding Rules for ASN.1*: https://www.itu.int/rec/T-REC-X.209-198811-W/en
3. ITU, introduction to ASN.1: https://www.itu.int/en/ITU-T/asn1/Pages/introduction.aspx
4. ITU, *Handbook on Satellite Communications*: https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf
5. NIST SP 1136: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1136.pdf
6. NIST Engineering Statistics Handbook, independence: https://itl.nist.gov/div898/software/dataplot/refman1/auxillar/chistest.htm
