import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stateInput = form.elements.state;

form.addEventListener('submit', event => {
    event.preventDefault();

const state = form.elements.state.value;
const delay = Number(delayInput.value); 

createPromise(delay,state)
    
.then(resolveDelay => {
        iziToast.success({
            title: "✅",
            message: `Fulfilled promise in ${resolveDelay}ms`
          });
        })

.catch(rejectedDelay => {
        iziToast.error({
            title: "❌",
            message: `Rejected promise in ${rejectedDelay}ms`
          });
    })
    
    .finally(() => {
        form.reset();
    });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
        if(state === "fulfilled"){
            resolve(delay);
        } else {
            reject(delay);
        }
       }, delay);
});
}