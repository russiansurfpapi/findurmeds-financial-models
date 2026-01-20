export function adminOrderNotification({
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  customerBirthdate,
  medicineName,
  dosage,
  form,
  quantity,
  zipCode,
  createdAt,
}: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerBirthdate?: string;
  medicineName: string;
  dosage: string;
  form: string;
  quantity: string;
  zipCode?: string;
  createdAt: string;
}) {
  return {
    subject: "New Order - FindUrMeds",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #151515;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #10b981;
            margin-top: 0;
        }
        .order-box {
            background-color: #f0f9ff;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-label {
            font-weight: 600;
            color: #6b7280;
            display: inline-block;
            width: 140px;
        }
        .detail-value {
            color: #111827;
        }
        .code-box {
            background-color: #1f2937;
            color: #10b981;
            padding: 15px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            margin: 15px 0;
            overflow-x: auto;
        }
        .tip-box {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 New Order Received!</h1>
        
        <p>A customer has successfully completed their payment. Here are the details:</p>

        <div class="order-box">
            <h3 style="color: #1e40af; margin-top: 0;">📋 Order Information</h3>
            
            <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value"><strong>${orderId}</strong></span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Customer:</span>
                <span class="detail-value">${customerName}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value"><a href="mailto:${customerEmail}">${customerEmail}</a></span>
            </div>
            
            ${customerPhone ? `
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${customerPhone}</span>
            </div>
            ` : ''}
            
            ${customerBirthdate ? `
            <div class="detail-row">
                <span class="detail-label">Birthday:</span>
                <span class="detail-value">${customerBirthdate}</span>
            </div>
            ` : ''}
            
            ${zipCode ? `
            <div class="detail-row">
                <span class="detail-label">Zip Code:</span>
                <span class="detail-value">${zipCode}</span>
            </div>
            ` : ''}
            
            <div class="detail-row">
                <span class="detail-label">Medicine:</span>
                <span class="detail-value"><strong>${medicineName}</strong></span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Dosage:</span>
                <span class="detail-value">${dosage}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Form:</span>
                <span class="detail-value">${form}</span>
            </div>
            
            <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${quantity}</span>
            </div>
        </div>

        <div class="tip-box">
            <strong>📬 Next Steps:</strong> Contact the customer within 1-2 business days with pharmacy availability and pricing information.
        </div>

        <h3>🤖 Agent Command</h3>
        <p>Use this command to process the order with our agent:</p>
        <div class="code-box">
python3 get_prompt.py \\<br/>
&nbsp;&nbsp;--medicine "${medicineName}" \\<br/>
&nbsp;&nbsp;--dosage "${dosage}" \\<br/>
&nbsp;&nbsp;--name "${customerName}" \\<br/>
&nbsp;&nbsp;--dob "${customerBirthdate || 'N/A'}" \\<br/>
&nbsp;&nbsp;--quantity "${quantity}" \\<br/>
&nbsp;&nbsp;--phone-number "${customerPhone || 'N/A'}" \\<br/>
&nbsp;&nbsp;--zipcode "${zipCode || ''}" \\<br/>
&nbsp;&nbsp;--set-values
        </div>

        <h3>🔍 Database Query</h3>
        <p>To view this order in the database, use:</p>
        <div class="code-box">
mongosh "YOUR_MONGODB_URI"<br/>
use findurmeds<br/>
db.orders.findOne({_id: ObjectId("${orderId}")})
        </div>

        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            Order placed at: ${createdAt}
        </p>
    </div>
</body>
</html>
    `,
    text: `
🎉 NEW ORDER RECEIVED!

A customer has successfully completed their payment.

ORDER INFORMATION:
------------------
Order ID:    ${orderId}
Customer:    ${customerName}
Email:       ${customerEmail}
${customerPhone ? `Phone:       ${customerPhone}\n` : ''}${customerBirthdate ? `Birthday:    ${customerBirthdate}\n` : ''}${zipCode ? `Zip Code:    ${zipCode}\n` : ''}
Medicine:    ${medicineName}
Dosage:      ${dosage}
Form:        ${form}
Quantity:    ${quantity}

NEXT STEPS:
-----------
Contact the customer within 1-2 business days with pharmacy availability and pricing information.

AGENT COMMAND:
--------------
Use this command to process the order with our agent:

python3 get_prompt.py \\
  --medicine "${medicineName}" \\
  --dosage "${dosage}" \\
  --name "${customerName}" \\
  --dob "${customerBirthdate || 'N/A'}" \\
  --quantity "${quantity}" \\
  --phone-number "${customerPhone || 'N/A'}" \\
  --zipcode "${zipCode || ''}" \\
  --set-values

DATABASE QUERY:
--------------
To view this order in the database, use:

mongosh "YOUR_MONGODB_URI"
use findurmeds
db.orders.findOne({_id: ObjectId("${orderId}")})

---
Order placed at: ${createdAt}
    `.trim()
  };
}

