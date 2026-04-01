import base64
import struct
import zlib

def create_png(width, height, color):
    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xffffffff)
    
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'
        for x in range(width):
            raw_data += bytes(color)
    
    return header + png_chunk(b'IHDR', ihdr) + png_chunk(b'IDAT', zlib.compress(raw_data)) + png_chunk(b'IEND', b'')

# Blue color (SGAC theme)
blue = (0, 35, 71)

# Create icons of different sizes
sizes = {
    'mipmap-mdpi/ic_launcher.png': 48,
    'mipmap-hdpi/ic_launcher.png': 72,
    'mipmap-xhdpi/ic_launcher.png': 96,
    'mipmap-xxhdpi/ic_launcher.png': 144,
    'mipmap-xxxhdpi/ic_launcher.png': 192,
}

for path, size in sizes.items():
    png_data = create_png(size, size, blue)
    with open(path, 'wb') as f:
        f.write(png_data)
    print(f'Created {path} ({size}x{size})')

print('All icons created!')
