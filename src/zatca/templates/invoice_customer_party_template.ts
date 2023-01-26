import { ZATCAStandardInvoiceCustomer } from "./standard_tax_invoice_template"; 
const template = /* XML */`
<cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyIdentification>
                <cbc:ID schemeID="NAT">SET_CUSTOMER_VAT</cbc:ID>
            </cac:PartyIdentification>
            <cac:PostalAddress>
                <cbc:StreetName>SET_CUSTOMER_STREET</cbc:StreetName>
                <cbc:AdditionalStreetName>-</cbc:AdditionalStreetName>
                <cbc:BuildingNumber>0000</cbc:BuildingNumber>
                <cbc:PlotIdentification>0000</cbc:PlotIdentification>
                <cbc:CitySubdivisionName>SET_CUSTOMER_CITY_SUB_DIVISION_NAME</cbc:CitySubdivisionName>
                <cbc:CityName>SET_CUSTOMER_CITY_NAME</cbc:CityName>
                <cbc:PostalZone>SET_CUSTOMER_POSTAL_CODE</cbc:PostalZone>
                <cbc:CountrySubentity>-</cbc:CountrySubentity>
                <cac:Country>
                    <cbc:IdentificationCode>SA</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>SET_CUSTOMER_REGISTERED_NAME</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingCustomerParty>`;


export default function populate(
    customer: ZATCAStandardInvoiceCustomer
): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_CUSTOMER_REGISTERED_NAME", `${customer.registered_name}`);
    populated_template = populated_template.replace("SET_CUSTOMER_STREET", `${customer.street}`);
    populated_template = populated_template.replace("SET_CUSTOMER_CITY_SUB_DIVISION_NAME", `${customer.city_subdivision_name}`);
    populated_template = populated_template.replace("SET_CUSTOMER_CITY_NAME", `${customer.city}`);
    populated_template = populated_template.replace("SET_CUSTOMER_POSTAL_CODE", `${customer.postcode}`);
    populated_template = populated_template.replace("SET_CUSTOMER_VAT", `${customer.vat_id}`);
    /** TODO replace hardcoded values with replace */
    return populated_template;
};