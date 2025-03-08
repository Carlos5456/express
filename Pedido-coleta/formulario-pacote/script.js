function increment() {
    var input = document.getElementById('qtd-emba');
    if (input.value < 10) {
        input.value++;
    }
}

function decrement() {
    var input = document.getElementById('qtd-emba');
    if (input.value > 1) {
        input.value--;
    }
}