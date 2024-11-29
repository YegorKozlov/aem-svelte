import './components/svelte-component';

document.querySelector('h2 > a').addEventListener('click', (e) => {
  Counter.increment();
  console.log(e);
});