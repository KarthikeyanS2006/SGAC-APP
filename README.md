# Sethupathy Government Arts College - Modernized Website

A modern, responsive, and easy-to-manage official website for **Sethupathy Government Arts College (SGAC)**, Ramanathapuram.

![College Branding](https://sgacrmd.edu.in/assets/logoclg.png)

## 🌟 Key Features

- **Modern Responsive Design**: Built with a "Mobile-First" approach using CSS Grid, Flexbox, and modern variables.
- **Dynamic Content Management**: An integrated **Admin Dashboard** allowing real-time updates to News, Events, and Downloads without touching the code.
- **Professional Institutional Branding**: Standardized official logos (TN Government & College) and institutional address across all 30+ pages.
- **Principal's Command Center**: A dedicated Principal's Desk section with a premium banner layout and professional typography.
- **Live Search & Filters**: Faster navigation for students to find courses, faculty, and academic downloads.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
- **Storage**: Browser LocalStorage for Admin persistence with JSON data synchronization (`js/site-data.js`).
- **Backend/Scripts**: AWS Lambda integration for contact form submissions.
- **Assets**: Optimized images and FontAwesome 6+ for high-quality iconography.

## 📁 Project Structure

```text
├── Activities/         # NSS, YRC, Sports, and other student activity pages
├── Courses/            # Undergraduate and Post-Graduate department pages
├── css/                # Modern design system (Variables, Reset, Modern Style)
├── js/                 # Core logic (site-data.js, modern.js, mail-script.js)
├── index.html          # Main homepage with dynamic hero and news tabs
├── admin.html          # Administrative dashboard for content control
├── Principal-Desk.html # Official Principal's message and banner
└── [Other Pages]       # History, Vision, Administration, and Honours
```

## 🔐 Administrative Dashboard (`admin.html`)

The website features a local administrative panel accessible via `admin.html`. 

### Capabilities:
1. **Home Slider**: Add or remove high-quality images for the main homepage carousel.
2. **News & Events**: Post real-time announcements for students.
3. **Downloads**: Manage PDF rank lists, applications, and hall tickets.
4. **Data Reset**: Instant recovery tool to sync back to the master institutional data.

> [!NOTE]
> Changes made in the Admin panel are saved to the browser's `LocalStorage`. For permanent site-wide updates, ensure you sync these changes with `js/site-data.js`.

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/[username]/college-website.git
   ```
2. **Run Locally**:
   Simply open `index.html` in any modern browser (Chrome, Edge, Firefox). No build step required!
3. **Updating Content**:
   Navigate to `admin.html` to update links, news, and images visually.

## 🏛️ Branding Standards

- **Official Address**: Atchunahtvayal Ramanathapuram 623501.
- **Primary Color**: `#225aaf` (SGAC Blue)
- **Secondary Color**: `#d4af37` (Academic Gold)

---

Developed for **Sethupathy Government Arts College, Ramanathapuram**.  
*Empowering through Education.*
