const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checked = Array.from(checkboxes).filter(cb => cb.checked);
        const checkedTitles = checked.map(cb => cb.title);
        const mergedAll = document.querySelector('#mergedAll');
        const productSrc = document.querySelector('#productSrc');
        
        if (checked.length > 0) {
            mergedAll.style.display = 'none';
            productSrc.style.display = 'block';
            filterItems(checkedTitles);
        } else {
            mergedAll.style.display = 'block';
            productSrc.style.display = 'none';
        }
    });
});
