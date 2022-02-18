export default function animate(e) {
  const obj = e.getBoundingClientRect();
  const dom = document.createElement('div');
  dom.style.width = '50px';
  dom.style.height = '50px';
  dom.style.borderRadius = '50%';
  dom.style.backgroundColor = '#f40';
  dom.style.position = 'fixed';
  document.body.appendChild(dom);
  dom.style.left = `${obj.left}px`;
  dom.style.top = `${obj.top}px`;
  dom.style.zIndex = 1000;
  dom.style.transition = '.3s';
  const card = document.getElementById('card');
  const { left, top } = card.getBoundingClientRect();
  const height = e.offsetHeight;
  console.log(height);
  dom.addEventListener('transitionend', () => {
    dom.remove();
  }, { once: true });
  dom.style.left = `${left}px`;
  dom.style.top = `${top}px`;
}
