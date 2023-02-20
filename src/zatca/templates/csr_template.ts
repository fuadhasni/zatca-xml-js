// 2.2.2 Profile specification of the Cryptographic Stamp identifiers. & CSR field contents / RDNs.
const template = `
oid_section = OIDs
[OIDs]
certificateTemplateName = 1.3.6.1.4.1.311.20.2
[req]
default_bits = 2048
req_extensions = v3_req
x509_extensions = v3_ca
prompt = no
default_md = sha 256
req_extensions = req_ext
distinguished_name = dn
[dn]
C=SA
OU=3000007762
O=SPA
CN=SPA-SIM-001
[v3_req]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment
[req_ext]
certificateTemplateName = ASN1:PRINTABLESTRING:ZATCA-Code-Signing
subjectAltName = dirName:alt_names
[alt_names]
SN=1-SPAice|2-IOS|3-c75573aa-6305-4fb0-9c0d-2257d1730d08
UID=300000776210003
title=1100
registeredAddress= Jeddah
businessCategory=Transport
`;


interface CSRConfigProps {
    private_key_pass?: string,
    production?: boolean,
    egs_model: string,
    egs_serial_number: string,
    solution_name: string,
    vat_number: string,
    branch_location: string,
    branch_industry: string,
    branch_name: string,
    taxpayer_name: string,
    taxpayer_provided_id: string

}
export default function populate(props: CSRConfigProps): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_PRIVATE_KEY_PASS", props.private_key_pass ?? "SET_PRIVATE_KEY_PASS");
    populated_template = populated_template.replace("SET_PRODUCTION_VALUE", props.production ? "ZATCA-Code-Signing" : "TSTZATCA-Code-Signing");
    populated_template = populated_template.replace("SET_EGS_SERIAL_NUMBER", `1-${props.solution_name}|2-${props.egs_model}|3-${props.egs_serial_number}`);
    populated_template = populated_template.replace("SET_VAT_REGISTRATION_NUMBER", props.vat_number);
    populated_template = populated_template.replace("SET_BRANCH_LOCATION", props.branch_location);
    populated_template = populated_template.replace("SET_BRANCH_INDUSTRY", props.branch_industry);
    populated_template = populated_template.replace("SET_COMMON_NAME", props.taxpayer_provided_id);
    populated_template = populated_template.replace("SET_BRANCH_NAME", props.branch_name);
    populated_template = populated_template.replace("SET_TAXPAYER_NAME", props.taxpayer_name);

    return populated_template;
};