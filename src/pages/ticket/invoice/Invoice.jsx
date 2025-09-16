import React, { useRef } from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import PassengerInvoice from './passengerinvoice/PassengerInvoice';
import CompanyInvoice from './company/CompanyInvoice';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const Invoice = () => {

    const invoiceRef = useRef(null);

    const handleDownload = async () => {
        if (invoiceRef.current === null) return; 

        // To download the invoice
        try {
            //convert the invoice car to an image
            const dataUrl = await toPng(invoiceRef.current);

            // download the image
            download(dataUrl, "H.D.S.Travels-invoice-report.png");
        } catch (error) {
            console.error("Error while downloading the invice",error);
        }
    }

  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Layout */}
        <TopLayout
            bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
            title={"Colect your invoice"} 
        />

        <RootLayout className="space-y-12 w-full pb-16">
            <div className="w-full flex items-center justify-center">

                {/* invoice card */}
                <div
                    ref={invoiceRef}  // refere th the invoice card
                    className="w-[90%] grid grid-cols-5 bg-white rounded-3xl border border-neutral-200 shadow-sm relative"
                >
                    {/* Left side (for passenger) */}
                    <PassengerInvoice />

                    {/* Right side (for company) */}
                    <CompanyInvoice />

                    {/* Cut circle */}
                    <div className="absolute -top-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50" />

                    <div className="absolute -bottom-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50" />

                </div>

            </div>
            {/* Download invoice card button */}
            <div className="w-full flex justify-center items-center">
                <button onClick={handleDownload} className="w-fit px-8 h-14 bg-primary text-neutral-50 font-bold text-lg rounded-lg">
                    Download Button
                </button>
            </div>
        </RootLayout>
    </div>
  )
}

export default Invoice
