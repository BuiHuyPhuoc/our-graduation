// Import thư viện Resend
// Lưu ý: Dòng "import" này chỉ hoạt động khi deploy trên Vercel
// (hoặc nếu bạn cấu hình ES Modules local)
// Để đơn giản cho local, chúng ta dùng "require"
const { Resend } = require('resend');

// Khởi tạo Resend với API Key
// process.env.RESEND_API_KEY là biến môi trường chúng ta sẽ cài đặt trên Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

// Đây là hàm handler mặc định của Vercel
module.exports = async (req, res) => {
    // Chỉ cho phép phương thức POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Thiếu tên hoặc email' });
        }

        const emailSubject = `Một lời mời đặc biệt dành cho ${name}!`;
        const emailHtml = `
            <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thư Mời Tốt Nghiệp</title>
    <!-- Thêm font Montserrat cho các trình duyệt email hỗ trợ -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #FCF9EA; font-family: 'Montserrat', Verdana, sans-serif;">
    
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #FCF9EA; padding: 40px 10px;">
        <tr>
            <td align="center">
                
                <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #FBF3D1; border: 2px solid #DEDED1; border-radius: 32px; overflow: hidden;">
                    
                    <tr>
                        <td align="center" style="padding: 40px 0 20px 0; font-size: 48px;">
                            🎓
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="left" style="padding: 0 40px 30px 40px; color: #4a453e; font-size: 16px; line-height: 1.6;">
                            
                            <!-- Chào mừng (dùng biến 'name') -->
                            <h1 style="font-family: 'Montserrat', Verdana, sans-serif; font-size: 28px; font-weight: 700; color: #4a453e; margin: 0 0 20px 0;">
                                Chào ${name},
                            </h1>
                            
                            <p style="margin: 0 0 15px 0;">
                                Cảm ơn bạn đã... tham gia thử nghiệm AI dự đoán tương lai! 😉
                            </p>
                            <p style="margin: 0 0 25px 0;">
                                Nhân tiện đây, mình muốn chia sẻ một tin vui <strong>CÓ THẬT</strong> và quan trọng hơn nhiều:
                            </p>
                            
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #FCF9EA; border: 2px dashed #B6AE9F; border-radius: 12px; padding: 25px;">
                                <tr>
                                    <td align="center">
                                        
                                        <p style="font-size: 16px; color: #786c62; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Trân trọng kính mời bạn đến tham dự
                                        </p>
                                        <p style="font-size: 24px; font-weight: 700; color: #4a453e; margin: 0 0 20px 0;">
                                            Lễ Tốt Nghiệp Cử Nhân
                                        </p>
                                        
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <!-- Ngày -->
                                            <tr style="vertical-align: top;">
                                                <td width="40" style="font-size: 24px; padding-bottom: 15px;">📅</td>
                                                <td style="font-size: 16px; color: #4a453e; padding-bottom: 15px; text-align: left; padding-left: 10px;">
                                                    <strong>Thứ Năm, ngày 30 tháng 10 năm 2025</strong>
                                                </td>
                                            </tr>
                                            <tr style="vertical-align: top;">
                                                <td width="40" style="font-size: 24px; padding-bottom: 15px;">🕒</td>
                                                <td style="font-size: 16px; color: #4a453e; padding-bottom: 15px; text-align: left; padding-left: 10px;">
                                                    <strong>13:00 (1:00 Chiều)</strong>
                                                </td>
                                            </tr>
                                            <tr style="vertical-align: top;">
                                                <td width="40" style="font-size: 24px;">📍</td>
                                                <td style="font-size: 16px; color: #4a453e; text-align: left; padding-left: 10px;">
                                                    <strong>HUFLIT Cơ sở Hóc Môn</strong>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 25px 0 10px 0; font-size: 16px;">
                                Sự hiện diện của bạn là niềm vinh hạnh rất lớn đối với mình. Rất mong được gặp bạn ở đó!
                            </p>
                            
                            <p style="margin: 20px 0 0 0; font-size: 16px;">
                                Trân trọng,<br>
                                <strong>Phước - Bờm - Puu</strong>
                            </p>
                            
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>
        `;

        // Gửi mail
        const { data, error } = await resend.emails.send({
            from: 'PnT <puuandmimi.our-graduation@our-graduation.puuandmimi.me>', // Cập nhật tên và domain của bạn
            to: [email],
            subject: emailSubject,
            html: emailHtml,
        });

        if (error) {
            console.error('Lỗi Resend:', error);
            return res.status(500).json({ error: 'Lỗi khi gửi email' });
        }

        return res.status(200).json({ success: true, message: 'Email đã được gửi.' });

    } catch (error) {
        console.error('Lỗi server:', error);
        return res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
};