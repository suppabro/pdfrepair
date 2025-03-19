<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fill PDF Form</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
        #pdf-container { position: relative; width: 100%; text-align: center; }
        canvas { border: 1px solid black; }
        .text-input { position: absolute; background: rgba(255,255,255,0.5); border: 1px solid black; }
    </style>
</head>
<body>
    <h2>Fill PDF Form</h2>
    <div id="pdf-container">
        <canvas id="pdf-canvas"></canvas>
    </div>
    <button onclick="downloadPDF()">Download Filled PDF</button>

    <script>
        const pdfUrl = "Repair Collection (1).pdf"; // Update this if needed
        let pdfCanvas = document.getElementById("pdf-canvas");
        let pdfContainer = document.getElementById("pdf-container");

        pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                let scale = 1.5;
                let viewport = page.getViewport({ scale });
                pdfCanvas.width = viewport.width;
                pdfCanvas.height = viewport.height;
                
                let ctx = pdfCanvas.getContext("2d");
                page.render({ canvasContext: ctx, viewport });

                addTextInput(100, 150, 200, 30); // Example text field (X, Y, Width, Height)
            });
        });

        function addTextInput(x, y, width, height) {
            let input = document.createElement("input");
            input.type = "text";
            input.className = "text-input";
            input.style.left = `${x}px`;
            input.style.top = `${y}px`;
            input.style.width = `${width}px`;
            input.style.height = `${height}px`;
            input.style.position = "absolute";
            pdfContainer.appendChild(input);
        }

        function downloadPDF() {
            html2canvas(pdfContainer).then(canvas => {
                let imgData = canvas.toDataURL("image/png");
                let pdf = new jspdf.jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("filled-form.pdf");
            });
        }
    </script>
</body>
</html>
