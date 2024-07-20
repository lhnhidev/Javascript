var button = document.getElementsByClassName('btn');
var monitor = document.getElementById('display');

[...button].forEach(item => {
    item.addEventListener('click', () => {
        if (monitor.value != 'Error') {
            if (item.innerHTML == '=') {
                try {
                    monitor.value = eval(monitor.value).toFixed(3);
                }
                catch(error) {
                    monitor.value = 'Error';
                }
            }
            else if (item.innerHTML == 'D') {
                monitor.value = monitor.value.slice(0, monitor.value.length - 1);
            }
            else if (item.innerHTML == 'C') {
                monitor.value = '';
            }
            else {
                monitor.value += item.innerHTML;
            }
        }
        else if (item.innerHTML == 'C') {
            monitor.value = '';
        }
    })
});