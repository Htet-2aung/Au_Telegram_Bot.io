const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if(coins == null){
    localStorage.setItem('coins' , '0');
    h1.textContent = '0';
}else{
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    localStorage.setItem('total' , '500')
    body.querySelector('#total').textContent = '/500';
}else {
    body.querySelector('#total').textContent = `/${total}`;
}


if(power == null){
    localStorage.setItem('power' , '500');
    body.querySelector('#power').textContent = '500';
}else{
    body.querySelector('#power').textContent = power;
}


if(count == null){
    localStorage.setItem('count' , '1')
}

image.addEventListener('click' , (e)=> {

    let x = e.offsetX;
    let y = e.offsetY;


    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if(Number(power) > 0){
        localStorage.setItem('coins' , `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power' , `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    if(x < 150 & y < 150){
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 & y > 150){
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 & y > 150){
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 & y < 150){
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }


    setTimeout(()=>{
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

setInterval(()=> {
    count = localStorage.getItem('count')
    power = localStorage.getItem('power');
    if(Number(total) > power){
        localStorage.setItem('power' , `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);

const coin = document.getElementById('coin');
const animationSpan = document.getElementById('coin-animation');
const coinRect = coin.getBoundingClientRect();

coin.addEventListener('click', () => {
    const randomX = Math.random() * 50 - 25; // adjust the range to be within 50px of the coin
    const randomY = Math.random() * 50 - 25; // adjust the range to be within 50px of the coin
    animationSpan.style.top = `${coinRect.top + randomY}
    px`;
    animationSpan.style.left = `${coinRect.left + randomX}px`;
    animationSpan.textContent = '+1';
    animationSpan.style.opacity = 1;
    animationSpan.style.transform = 'scale(1.5)';
    setTimeout(() => {
        animationSpan.style.opacity = 0;
        animationSpan.style.transform = 'scale(1)';
    }, 1000);
});

const coinAnimation = document.getElementById('coin-animation');
const turboButton = document.getElementById('turbo');
let multiTouchEnabled = false;
let maxTouches = 1; // default to 1 touch

// Add event listener to turbo button
turboButton.addEventListener('click', () => {
    // Upgrade boosts and enable multi-touch
    maxTouches = 3; // upgrade to 3 touches
    multiTouchEnabled = true;
    console.log('Turbo boost activated! Multi-touch enabled.');
});

// Add event listener to coin
coin.addEventListener('touchstart', (event) => {
    if (multiTouchEnabled) {
        // Get the number of touches
        const touches = event.touches.length;
        if (touches <= maxTouches) {
            // Perform animation for each touch
            for (let i = 0; i < touches; i++) {
                const touch = event.touches[i];
                const randomX = Math.random() * 50 - 25;
                const randomY = Math.random() * 50 - 25;
                coinAnimation.style.top = `${touch.clientY + randomY}px`;
                coinAnimation.style.left = `${touch.clientX + randomX}px`;
                coinAnimation.textContent = '+1';
                coinAnimation.style.opacity = 1;
                coinAnimation.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    coinAnimation.style.opacity = 0;
                    coinAnimation.style.transform = 'scale(1)';
                }, 1000);
            }
        }
    } else {
        // Perform single touch animation
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        coinAnimation.style.top = `${event.clientY + randomY}px`;
        coinAnimation.style.left = `${event.clientX + randomX}px`;
        coinAnimation.textContent = '+1';
        coinAnimation.style.opacity = 1;
        coinAnimation.style.transform = 'scale(1.5)';
        setTimeout(() => {
            coinAnimation.style.opacity = 0;
            coinAnimation.style.transform = 'scale(1)';
        }, 1000);
    }
});