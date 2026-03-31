const fs = require('fs');

// Modern template for About Us pages
function createAboutPage(config) {
    const { filename, title, icon, content } = config;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="./img/fav_icon.png" type="image/png">
  <title>${title} | Sethupathy Government Arts College</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Roboto:wght@300;400;500;700&family=Raleway:wght@500;600;700&family=Montaga&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/3ee7079dc6.js" crossorigin="anonymous"></script>
  
  <link rel="stylesheet" href="./css/modern-variables.css">
  <link rel="stylesheet" href="./css/modern-reset.css">
  <link rel="stylesheet" href="./css/modern-style.css">
  <link rel="stylesheet" href="./css/bootstrap.css">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/mystyle.css">
</head>

<body>
  <div class="top-bar">
    <div class="container">
      <div>
        <a href="mailto:contact@sgacrmd.edu.in"><i class="fa fa-envelope"></i> contact@sgacrmd.edu.in</a>
        <a href="tel:+914567221343"><i class="fa fa-phone"></i> +91-4567-221343</a>
      </div>
      <div>
        <a href="./index.html"><i class="fa fa-home"></i> Home</a>
      </div>
    </div>
  </div>

  <header class="main-header">
    <div class="container">
      <div class="header-content">
        <div class="header-logo">
          <a href="./index.html"><img src="./img/tamil_logo.png" alt="Government Logo"></a>
        </div>
        <div class="header-title">
          <h1 class="college-name">Sethupathy Government Arts College, Ramanathapuram-623501</h1>
          <p class="college-name-tamil">செதுபாதி அரசு கலை கல்லூரி, இராமநாதபுரம்-623501</p>
          <p class="college-subtitle">(Accredited with 'B' Grade by NAAC)</p>
          <p class="college-subtitle">Affiliated to Alagappa University, Karaikudi</p>
        </div>
        <div class="header-logo">
          <a href="./index.html"><img src="./img/logo_new1.png" alt="College Logo"></a>
        </div>
      </div>
    </div>
  </header>

  <nav class="navbar">
    <div class="container">
      <button class="mobile-menu-toggle" aria-label="Toggle Navigation">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="nav-menu">
        <li class="nav-item"><a href="./index.html" class="nav-link">Home</a></li>
        <li class="nav-item dropdown">
          <a href="#" class="nav-link">About Us <i class="fas fa-chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><a href="./History.html" class="nav-link">History</a></li>
            <li><a href="./Vision.html" class="nav-link">Vision & Mission</a></li>
            <li><a href="./Administration.html" class="nav-link">Administration</a></li>
            <li><a href="./Honours.html" class="nav-link">List of Principals</a></li>
            <li><a href="./Principal-Desk.html" class="nav-link">Principal's Desk</a></li>
          </ul>
        </li>
        <li class="nav-item"><a href="./index.html#contactarea" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section class="content-section" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%); padding: var(--space-2xl) 0;">
    <div class="container">
      <div style="text-align: center; color: var(--color-white);">
        <h1 style="font-size: var(--font-size-3xl); margin-bottom: var(--space-md); color: var(--color-white);">
          <i class="fas fa-${icon}" style="margin-right: var(--space-md); color: var(--color-gold);"></i>
          ${title}
        </h1>
        <nav style="display: flex; justify-content: center; gap: var(--space-md); font-size: var(--font-size-base);">
          <a href="./index.html" style="color: var(--color-white); opacity: 0.9;">Home</a>
          <span style="opacity: 0.6;">/</span>
          <span style="opacity: 0.9;">About Us</span>
          <span style="opacity: 0.6;">/</span>
          <span style="font-weight: var(--font-weight-semibold);">${title}</span>
        </nav>
      </div>
    </div>
  </section>

  <section class="content-section" style="padding-top: 0;">
    <div class="container">
      ${content}
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <h4>Quick Links</h4>
          <a href="./History.html">History</a>
          <a href="./Vision.html">Vision & Mission</a>
          <a href="./Administration.html">Administration</a>
          <a href="./Library.html">Library</a>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>Ramanathapuram<br>Tamil Nadu - 623501</p>
          <p>Phone: +91-4567-221343</p>
          <p>Email: contact@sgacrmd.edu.in</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <script>document.write(new Date().getFullYear());</script> Sethupathy Government Arts College. All Rights Reserved.</p>
      </div>
    </div>
  </footer>

  <script src="./js/jquery-3.2.1.min.js"></script>
  <script src="./js/modern.js"></script>
</body>
</html>`;
}

const pages = [
    {
        filename: 'History.html',
        title: 'History of the College',
        icon: 'landmark',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-history" style="color: var(--color-gold);"></i> Our Legacy
        </h3>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px;">
          Sethupathy Government Arts College was established to provide quality higher education to the students of Ramanathapuram district. 
          Over the years, the college has grown to become one of the premier institutions in the region, offering a wide range of undergraduate 
          and postgraduate programs.
        </p>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px; margin-top: var(--space-lg);">
          The college has consistently maintained high academic standards and has produced numerous successful alumni who have excelled in 
          various fields. Our commitment to excellence in education and character building continues to guide our mission.
        </p>
      </div>`
    },
    {
        filename: 'Vision.html',
        title: 'Vision & Mission',
        icon: 'bullseye',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="far fa-eye" style="color: var(--color-gold);"></i> Our Vision
        </h3>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px;">
          To be a center of excellence in higher education, fostering intellectual growth, innovation, and social responsibility 
          among our students while contributing to the development of society.
        </p>
      </div>
      
      <div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-bullseye" style="color: var(--color-gold);"></i> Our Mission
        </h3>
        <ul style="line-height: 2; font-size: 17px; margin-left: var(--space-xl);">
          <li>To provide quality education in various disciplines</li>
          <li>To promote research and innovation among faculty and students</li>
          <li>To develop students' personality through holistic education</li>
          <li>To foster values of integrity, discipline, and social responsibility</li>
          <li>To create future leaders who contribute to national development</li>
        </ul>
      </div>`
    },
    {
        filename: 'Administration.html',
        title: 'Administration',
        icon: 'users-cog',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-user-tie" style="color: var(--color-gold);"></i> Administrative Team
        </h3>
        <p style="text-align: center; color: var(--color-gray); margin: var(--space-2xl) 0;">
          Administrative details will be updated soon.
        </p>
      </div>`
    },
    {
        filename: 'Honours.html',
        title: 'List of Principals',
        icon: 'award',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-medal" style="color: var(--color-gold);"></i> Former Principals
        </h3>
        <p style="text-align: center; color: var(--color-gray); margin: var(--space-2xl) 0;">
          List of former principals will be updated soon.
        </p>
      </div>`
    },
    {
        filename: 'Principal-Desk.html',
        title: "Principal's Desk",
        icon: 'user-graduate',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-comment-dots" style="color: var(--color-gold);"></i> Message from the Principal
        </h3>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px;">
          Dear Students and Faculty,
        </p>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px; margin-top: var(--space-lg);">
          Welcome to Sethupathy Government Arts College. It is my privilege to lead this esteemed institution dedicated to 
          providing quality education and fostering holistic development of our students.
        </p>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px; margin-top: var(--space-lg);">
          We are committed to academic excellence, character building, and preparing our students for successful careers and 
          meaningful lives. I encourage all members of our college community to work together towards achieving our shared goals.
        </p>
        <p style="margin-top: var(--space-2xl); font-style: italic; color: var(--color-primary);">
          Best wishes for your academic journey!
        </p>
      </div>`
    },
    {
        filename: 'Library.html',
        title: 'Library',
        icon: 'book',
        content: `<div class="content-card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
          <i class="fas fa-book-open" style="color: var(--color-gold);"></i> College Library
        </h3>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px;">
          Our college library is a treasure house of knowledge, providing students and faculty with access to a vast 
          collection of books, journals, and digital resources.
        </p>
        <p style="text-align: justify; line-height: 1.8; font-size: 17px; margin-top: var(--space-lg);">
          Library facilities and timings will be updated soon.
        </p>
      </div>`
    }
];

console.log('Creating About Us pages...\n');
pages.forEach(({ filename, title, icon, content }) => {
    const html = createAboutPage({ filename, title, icon, content });
    fs.writeFileSync('d:/Karthikeyan S/College Website/2nd time Upgrade/' + filename, html);
    console.log(`✓ ${filename} created!`);
});

console.log('\n🎉 All About Us pages created successfully!');
