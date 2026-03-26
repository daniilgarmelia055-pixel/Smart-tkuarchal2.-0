// ТВОЯ АНТЕННА (СВЯЗЬ С ТАБЛИЦЕЙ ПО ТВОЕМУ ID)
const APP_URL = "https://script.google.com";

async function loadData(tab, element) {
    // Подсветка кнопок при нажатии
    if (element) {
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    }

    const box = document.getElementById('content-area');
    box.innerHTML = '<div class="loader">СИНХРОНИЗАЦИЯ...</div>';
    
    try {
        // Запрос к твоей таблице
        const r = await fetch(APP_URL + "?type=" + encodeURIComponent(tab));
        const data = await r.json();
        box.innerHTML = '';
        
        if (data && data.length > 0) {
            // Если Туризм, Новости или Спорт — делаем Инста-ленту
            if (tab === 'tourism'  tab === 'news'  tab === 'sport') {
                box.className = 'insta-scroll';
                data.forEach(item => {
                    const v = Object.values(item);
                    box.innerHTML += 
                        <div class="insta-item">
                            <img src="${v[2] || 'https://via.placeholder.com'}" class="insta-img">
                            <div class="insta-info">
                                <h4>${v[0]}</h4>
                                <p style="margin:5px 0 0; font-size:14px; color:#636e72;">${v[1] || ''}</p>
                            </div>
                        </div>;
                });
            } else {
                // Для остального (Рейсы, Службы) — список
                box.className = '';
                data.forEach(item => {
                    const v = Object.values(item);
                    box.innerHTML += 
                        <div style="background:white; margin:10px 20px; padding:20px; border-radius:25px; display:flex; align-items:center; gap:15px; box-shadow:0 4px 10px rgba(0,0,0,0.02); border-left:6px solid var(--primary);">
                            <div style="flex:1"><h4>${v[0]}</h4><p>${v[1] || ''}</p></div>
                            <div style="font-size:20px;">${v[2] || (tab === 'Службы' ? '📞' : '🚌')}</div>
                        </div>;
                });
            }
        } else {
            box.innerHTML = '<div class="loader">В РАЗДЕЛЕ "' + tab.toUpperCase() + '"<br>ПОКА ПУСТО 🍃</div>';
        }
    } catch (e) { 
        box.innerHTML = '<div class="loader" style="color:red;">ОШИБКА СВЯЗИ 🌐<br><small>Проверь "Доступ по ссылке"</small></div>'; 
    }
}

// Загрузка страницы "Дом" при входе
window.onload = () => { loadData('tourism', document.getElementById('btn-home')); };