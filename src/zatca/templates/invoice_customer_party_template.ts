import { ZATCAStandardInvoiceCustomer } from "./standard_tax_invoice_template";
const template = /* XML */`
<cac:AccountingCustomerParty>
        <cac:Party>
            SET_CUSTOMER_PARTY_IDENTIFICATION
            <cac:PostalAddress>
                <cbc:StreetName>SET_CUSTOMER_STREET</cbc:StreetName>
                <cbc:AdditionalStreetName>-</cbc:AdditionalStreetName>
                <cbc:BuildingNumber>SET_CUSTOMER_BUILDING_NUMBER</cbc:BuildingNumber>
                <cbc:PlotIdentification>SET_CUSTOMER_PLOT_IDENTIFICATION</cbc:PlotIdentification>
                <cbc:CitySubdivisionName>SET_CUSTOMER_CITY_SUB_DIVISION_NAME</cbc:CitySubdivisionName>
                <cbc:CityName>SET_CUSTOMER_CITY_NAME</cbc:CityName>
                <cbc:PostalZone>SET_CUSTOMER_POSTAL_CODE</cbc:PostalZone>
                <cbc:CountrySubentity>SET_CUSTOMER_SUB_ENTITY</cbc:CountrySubentity>
                <cac:Country>
                    <cbc:IdentificationCode>SET_CUSTOMER_COUNTRY_CODE</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            SET_CUSTOMER_PARTY_TAX_SCHEME
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>SET_CUSTOMER_REGISTERED_NAME</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:Delivery>
        <cbc:ActualDeliveryDate>SET_ACTUAL_DELIVERY_DATE</cbc:ActualDeliveryDate>
        <cbc:LatestDeliveryDate>SET_LATEST_DELIVERY_DATE</cbc:LatestDeliveryDate>
    </cac:Delivery>`;


export default function populate(
    customer: ZATCAStandardInvoiceCustomer,
    date: string
): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_CUSTOMER_REGISTERED_NAME", `${customer.registered_name}`);
    populated_template = populated_template.replace("SET_CUSTOMER_STREET", `${customer.street}`);
    populated_template = populated_template.replace("SET_CUSTOMER_CITY_SUB_DIVISION_NAME", `${customer.city_subdivision_name}`);
    populated_template = populated_template.replace("SET_CUSTOMER_CITY_NAME", `${customer.city}`);
    populated_template = populated_template.replace("SET_CUSTOMER_POSTAL_CODE", `${customer.postcode}`);
    const hasValidCrn = customer.crn && /^[0-9]{10}$/.test(customer.crn) && customer.crn !== '0000000000';
    const hasVat = customer.vat_id && /^[0-9]{15}$/.test(customer.vat_id.trim());

    let partyIdentification = "";
    let partyTaxScheme = `
            <cac:PartyTaxScheme>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>`;

    if (hasValidCrn) {
        partyIdentification = `
            <cac:PartyIdentification>
                <cbc:ID schemeID="CRN">${customer.crn}</cbc:ID>
            </cac:PartyIdentification>`;
        if (hasVat) {
            partyTaxScheme = `
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${customer.vat_id!.trim()}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>`;
        }
    } else if (hasVat) {
        partyIdentification = ""; // Omit PartyIdentification
        partyTaxScheme = `
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${customer.vat_id!.trim()}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>`;
    } else {
        partyIdentification = `
            <cac:PartyIdentification>
                <cbc:ID schemeID="NAT">0000</cbc:ID>
            </cac:PartyIdentification>`;
    }

    populated_template = populated_template.replace("SET_CUSTOMER_PARTY_IDENTIFICATION", partyIdentification);
    populated_template = populated_template.replace("SET_CUSTOMER_PARTY_TAX_SCHEME", partyTaxScheme);
    populated_template = populated_template.replace("SET_CUSTOMER_BUILDING_NUMBER", `${customer.building_number || '0000'}`);
    populated_template = populated_template.replace("SET_CUSTOMER_PLOT_IDENTIFICATION", `${customer.plot_Identification || '0000'}`);
    populated_template = populated_template.replace("SET_CUSTOMER_SUB_ENTITY", `${customer.country_subentity || '-'}`);
    populated_template = populated_template.replace("SET_CUSTOMER_COUNTRY_CODE", `${customer.country || 'SA'}`);
    populated_template = populated_template.replace("SET_ACTUAL_DELIVERY_DATE", `${date}`);
    populated_template = populated_template.replace("SET_LATEST_DELIVERY_DATE", `${date}`);
    /** TODO replace hardcoded values with replace */
    return populated_template;
};