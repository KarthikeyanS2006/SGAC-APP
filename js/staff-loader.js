// Staff Loader for Administration Page
function loadStaffData() {
    const data = loadSiteData();
    const staff = data.staff || [];
    
    const staffTable = document.getElementById('staff-table-body');
    if (!staffTable) return;
    
    if (staff.length === 0) {
        staffTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">No staff data available</td></tr>';
        return;
    }
    
    staffTable.innerHTML = staff.map((s, index) => `
        <tr style="border-bottom: 1px solid var(--color-light-gray);">
            <td style="padding: var(--space-md);">${index + 1}</td>
            <td style="padding: var(--space-md);">${s.name}</td>
            <td style="padding: var(--space-md);">${s.designation}</td>
            <td style="padding: var(--space-md);">${s.department || ''}</td>
        </tr>
    `).join('');
}
