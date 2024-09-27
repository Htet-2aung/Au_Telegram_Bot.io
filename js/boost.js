const body = document.body;
let coins = localStorage.getItem('coins');
let turboCount = localStorage.getItem('turboCount') || 3;
let energyCount = localStorage.getItem('energyCount') || 3;
let level = localStorage.getItem('level') || 1;

body.querySelector('#balance').textContent = Number(coins).toLocaleString()
body.querySelector('#turbo-count').textContent = `${turboCount}/3`;
body.querySelector('#energy-count').textContent = `${energyCount}/3`;
body.querySelector('#level').textContent = `Level ${level}`;

const turbo = body.querySelector('#turbo');
const charge = body.querySelector('#charge');

turbo.addEventListener('click' , ()=>{
    if (turboCount > 0) {
        localStorage.setItem('count' , '40')
        setTimeout(()=> {
            localStorage.setItem('count' , '1')
        }, 5000)
        turboCount--;
        localStorage.setItem('turboCount', turboCount);
        body.querySelector('#turbo-count').textContent = `${turboCount}/3`;
    }
})

charge.addEventListener('click' , ()=> {
    if (energyCount > 0) {
        let total = localStorage.getItem('total')
        localStorage.setItem('power' , total)
        energyCount--;
        localStorage.setItem('energyCount', energyCount);
        body.querySelector('#energy-count').textContent = `${energyCount}/3`;
    }
})

// Get the upgrade buttons
const upgradeButtons = document.querySelectorAll('.boosters-button');

// Add event listener to each upgrade button
upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the upgrade type
        const upgradeType = button.dataset.upgradeType;
        if (upgradeType === 'turbo' || upgradeType === 'energy') {
            // Decrement the count
            if (upgradeType === 'turbo') {
                turboCount--;
                localStorage.setItem('turboCount', turboCount);
                body.querySelector('#turbo-count').textContent = `${turboCount}/3`;
            } else {
                energyCount--;
                localStorage.setItem('energyCount', energyCount);
                body.querySelector('#energy-count').textContent = `${energyCount}/3`;
            }
        } else {
            // Increment the level
            level++;
            localStorage.setItem('level', level);
            body.querySelector('#level').textContent = `Level ${level}`;
        }
        // Redirect the user back to the previous page
        history.back();
    });
});