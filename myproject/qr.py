import qrcode
img = qrcode.make("http://localhost:3000/")
img.save("homepage-qr.png")
