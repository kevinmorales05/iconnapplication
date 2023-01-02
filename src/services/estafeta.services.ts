import { EstafetaApi } from '../http/estafeta-api';

async function getPackageTracking(trackingNumber: string): Promise<any> {
  // TODO: change "search" by scroll.
  const body = `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.estafeta.com/">
<SOAP-ENV:Body>
   <ns1:ExecuteQuery>
      <ns1:suscriberId>25</ns1:suscriberId>
      <ns1:login>Usuario1</ns1:login>
      <ns1:password>1GCvGIu$</ns1:password>
      <ns1:searchType>
         <ns1:waybillList>
            <ns1:waybillType>G</ns1:waybillType>
            <ns1:waybills>
               <ns1:string>${trackingNumber}</ns1:string>
            </ns1:waybills>
         </ns1:waybillList>
         <ns1:type>L</ns1:type>
      </ns1:searchType>
      <ns1:searchConfiguration>
         <ns1:includeDimensions>true</ns1:includeDimensions>
         <ns1:includeWaybillReplaceData>true</ns1:includeWaybillReplaceData>
         <ns1:includeReturnDocumentData>true</ns1:includeReturnDocumentData>
         <ns1:includeMultipleServiceData>true</ns1:includeMultipleServiceData>
         <ns1:includeInternationalData>true</ns1:includeInternationalData>
         <ns1:includeSignature>false</ns1:includeSignature>
         <ns1:includeCustomerInfo>true</ns1:includeCustomerInfo>
         <ns1:historyConfiguration>
            <ns1:includeHistory>true</ns1:includeHistory>
            <ns1:historyType>ALL</ns1:historyType>
         </ns1:historyConfiguration>
         <ns1:filterType>
            <ns1:filterInformation>false</ns1:filterInformation>
         </ns1:filterType>
      </ns1:searchConfiguration>
   </ns1:ExecuteQuery>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
  const response = await EstafetaApi.getInstance().postRequest('/Service.asmx?wsdl', body);
  if (response === undefined) return Promise.reject(new Error('getPackageTracking'));
  const { data } = response;
  return data;
}

export const estafetaServices = {
  getPackageTracking
};
