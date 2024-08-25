// const fetch = require('node-fetch');
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

async function generateTicketWithImage(booking, imageUrl) {
    const doc = new PDFDocument();
    const passThroughStream = new PassThrough();

    // Pipe PDF document to PassThrough stream
    doc.pipe(passThroughStream);

    // Add ticket content
    doc.fontSize(16).text(`Booking ID: ${booking._id}`);
    doc.fontSize(14).text(`Event: ${booking.eventId.name}`);
    doc.fontSize(12).text(`User: ${booking.userId.username}`);
    doc.fontSize(12).text(`Date: ${booking.bookingDate}`);

    // Handle image
    if (imageUrl) {
        try {
            const fetch = (await import('node-fetch')).default;
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error(`Image fetch failed. Status: ${response.status}`);

            // Pipe the image stream to PDF
            const arrayBuffer = await response.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);
            doc.image(imageBuffer, { fit: [250, 300], align: 'center', valign: 'center' });
        } catch (error) {
            console.error('Error fetching or adding image:', error);
        }
    }

    doc.end(); // Finalize the PDF

    return passThroughStream;
}

module.exports = { generateTicketWithImage };
