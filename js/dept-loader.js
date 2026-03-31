// Department Page Dynamic Loader
// Include this script in department pages and call loadDeptData('deptKey')

function loadDeptData(deptKey) {
    // Use SiteData directly to bypass localStorage issues
    const deptData = SiteData.departments ? SiteData.departments[deptKey] : null;
    if (!deptData) {
        console.log('No data found for department:', deptKey);
        return;
    }

    // Update page title
    const titleEl = document.querySelector('.college-name, h1');
    if (titleEl && titleEl.textContent.includes('Department')) {
        titleEl.textContent = 'Department of ' + deptData.name;
    }

    // Update banner title
    const bannerTitle = document.querySelector('.content-section h1');
    if (bannerTitle) {
        bannerTitle.innerHTML = `<i class="fas ${deptData.icon || 'fa-book'}" style="margin-right: var(--space-md); color: var(--color-gold);"></i> Department of ${deptData.name}`;
    }

    // Load About tab
    const aboutContent = document.querySelector('#about .content-card');
    if (aboutContent && deptData.about) {
        aboutContent.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">
                <i class="fas fa-info-circle" style="color: var(--color-gold);"></i>
                About Our Department
            </h3>
            <p style="text-indent: 50px; text-align: justify; font-size: 17px; line-height: 1.8; margin-bottom: var(--space-md);">
                ${deptData.about}
            </p>
        `;
    }

    // Load Vision/Mission tab
    const visionContent = document.querySelector('#vision .content-card');
    if (visionContent) {
        visionContent.innerHTML = `
            <h4 style="color: var(--color-primary); margin-bottom: var(--space-md); font-size: var(--font-size-xl);">
                <i class="far fa-eye" style="color: var(--color-gold);"></i> Vision:
            </h4>
            <p style="font-size: 17px; line-height: 1.8; margin-bottom: var(--space-xl);">
                ${deptData.vision || 'Vision statement will be updated soon.'}
            </p>
            <h4 style="color: var(--color-primary); margin-bottom: var(--space-md); font-size: var(--font-size-xl);">
                <i class="fas fa-bullseye" style="color: var(--color-gold);"></i> Mission:
            </h4>
            <p style="font-size: 17px; line-height: 1.8;">
                ${deptData.mission || 'Mission statement will be updated soon.'}
            </p>
        `;
    }

    // Load Faculty tab
    const facultyContent = document.querySelector('#faculty .content-card');
    if (facultyContent && deptData.faculty && deptData.faculty.length > 0) {
        let facultyHtml = `
            <div style="text-align: center; margin-bottom: var(--space-2xl);">
                <h2 style="color: var(--color-primary); margin-bottom: var(--space-md);">Our Faculty</h2>
                <p style="color: var(--color-gray); font-style: italic;">"Teaching is the one profession that creates all other professions"</p>
            </div>
            <div class="faculty-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-bottom: 30px;">
        `;
        
        const defaultImage = 'https://ui-avatars.com/api/?name=Faculty&background=random&color=fff&size=150';
        
        deptData.faculty.forEach((f, index) => {
            const imgUrl = f.image || defaultImage;
            facultyHtml += `
                <div style="background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s;">
                    <img src="${imgUrl}" alt="${f.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid var(--color-gold);" onerror="this.src='${defaultImage}'">
                    <h4 style="color: var(--color-primary); margin-bottom: 5px; font-size: 16px;">${f.name}</h4>
                    <p style="color: #666; font-size: 13px; margin-bottom: 5px;">${f.designation}</p>
                    <p style="color: #888; font-size: 12px; margin-bottom: 5px;">${f.qualification}</p>
                    ${f.email ? `<p style="color: #666; font-size: 11px; margin-bottom: 3px;"><i class="fas fa-envelope"></i> ${f.email}</p>` : ''}
                    ${f.phone ? `<p style="color: #666; font-size: 11px; margin-bottom: 10px;"><i class="fas fa-phone"></i> ${f.phone}</p>` : ''}
                    ${f.resume ? `<a href="${f.resume}" target="_blank" class="btn" style="background: var(--color-primary); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; text-decoration: none;">
                        <i class="fas fa-user"></i> View Profile
                    </a>` : ''}
                </div>
            `;
        });
        
        facultyHtml += '</div>';
        facultyContent.innerHTML = facultyHtml;
    }

    // Load Activity tab
    const activityContent = document.querySelector('#activity .content-card');
    if (activityContent) {
        if (deptData.activities && deptData.activities.length > 0) {
            let activityHtml = '<h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">Department Activities</h3>';
            deptData.activities.forEach(activity => {
                activityHtml += `
                    <div style="padding: var(--space-md); border-left: 3px solid var(--color-gold); margin-bottom: var(--space-md); background: var(--color-light);">
                        <h4 style="color: var(--color-primary);">${activity.title}</h4>
                        <p style="color: var(--color-gray); font-size: 14px;">${activity.description}</p>
                    </div>
                `;
            });
            activityContent.innerHTML = activityHtml;
        } else {
            activityContent.innerHTML = `
                <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">Department Activities</h3>
                <p style="text-align: center; color: var(--color-gray); padding: var(--space-3xl) 0;">
                    Activity details will be updated soon.
                </p>
            `;
        }
    }

    // Load Achievement tab
    const achievementContent = document.querySelector('#achievement .content-card');
    if (achievementContent) {
        if (deptData.achievements && deptData.achievements.length > 0) {
            let achievementHtml = '<h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">Department Achievements</h3>';
            deptData.achievements.forEach(achievement => {
                achievementHtml += `
                    <div style="padding: var(--space-md); border-left: 3px solid var(--color-gold); margin-bottom: var(--space-md); background: var(--color-light);">
                        <h4 style="color: var(--color-primary);">${achievement.title}</h4>
                        <p style="color: var(--color-gray); font-size: 14px;">${achievement.description}</p>
                    </div>
                `;
            });
            achievementContent.innerHTML = achievementHtml;
        } else {
            achievementContent.innerHTML = `
                <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">Department Achievements</h3>
                <p style="text-align: center; color: var(--color-gray); padding: var(--space-3xl) 0;">
                    Achievement details will be updated soon.
                </p>
            `;
        }
    }

    // Load E-Content tab
    const econtentContent = document.querySelector('#econtent .content-card');
    if (econtentContent) {
        if (deptData.econtent && deptData.econtent.length > 0) {
            let econtentHtml = '<h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">E-Learning Resources</h3>';
            deptData.econtent.forEach(content => {
                econtentHtml += `
                    <div style="padding: var(--space-md); margin-bottom: var(--space-md); background: var(--color-light); border-radius: 8px;">
                        <h4 style="color: var(--color-primary);">${content.title}</h4>
                        <a href="${content.link}" style="color: var(--color-gold);">${content.link}</a>
                    </div>
                `;
            });
            econtentContent.innerHTML = econtentHtml;
        } else {
            econtentContent.innerHTML = `
                <h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">E-Learning Resources</h3>
                <p style="text-align: center; color: var(--color-gray); padding: var(--space-3xl) 0;">
                    E-content will be updated soon.
                </p>
            `;
        }
    }

    // Load Gallery tab
    const galleryContent = document.querySelector('#gallery .content-card');
    if (galleryContent) {
        // Fallback images if gallery is empty or undefined
        const fallbackImages = [
            { src: 'https://picsum.photos/seed/' + deptKey + '1/400/300', caption: 'College Campus View' },
            { src: 'https://picsum.photos/seed/' + deptKey + '2/400/300', caption: 'Academic Activities' },
            { src: 'https://picsum.photos/seed/' + deptKey + '3/400/300', caption: 'Student Events' },
            { src: 'https://picsum.photos/seed/' + deptKey + '4/400/300', caption: 'Department Facilities' }
        ];
        
        const galleryImages = (deptData.gallery && deptData.gallery.length > 0) ? deptData.gallery : fallbackImages;
        
        let galleryHtml = '<h3 style="color: var(--color-primary); margin-bottom: var(--space-lg);">Department Gallery</h3><div class="gallery-grid">';
        galleryImages.forEach(img => {
            galleryHtml += `
                <div class="gallery-item">
                    <img src="${img.src}" alt="${img.caption}">
                    <div class="gallery-overlay">
                        <span>${img.caption}</span>
                    </div>
                </div>
            `;
        });
        galleryHtml += '</div>';
        galleryContent.innerHTML = galleryHtml;
    }

    console.log('Department data loaded:', deptKey);
}
