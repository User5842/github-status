const loading = document.querySelector('.loading');
const refreshButton = document.querySelector('.refresh');
const statusWrapper = document.querySelector('.status');

refreshButton.addEventListener('click', fetchStatus);

function fetchStatus() {
    toggleVisibility();

    fetch('http://localhost:3000/status')
        .then(response => response.json())
        .then(data => {
            statusWrapper.innerHTML = '';
            toggleVisibility();

            data.status.forEach(statusItem => {
                const statusTemplate = document.querySelector('#status__template').content;
                const statusTemplateClone = statusTemplate.cloneNode(true);
                const statusTemplateElement = statusTemplateClone.querySelector('.status__box');
    
                const statusBoxName = statusTemplateElement.querySelector('.status__box-name');
                const statusBoxStatus = statusTemplateElement.querySelector('.status__box-status');

                statusBoxName.textContent = statusItem.name;
                statusBoxStatus.textContent = statusItem.status;

                if (statusItem.status !== 'Operational') {
                    statusTemplateElement.style.borderTop = '4px solid red';
                }

                statusWrapper.append(statusTemplateElement);
            });
        });
}

function toggleVisibility() {
    if (!refreshButton.classList.contains('display_type_hidden')) {
        loading.classList.remove('display_type_hidden');
        refreshButton.classList.add('display_type_hidden');
        statusWrapper.classList.add('display_type_hidden');
        return;
    }

    loading.classList.add('display_type_hidden');
    refreshButton.classList.remove('display_type_hidden');
    statusWrapper.classList.remove('display_type_hidden');
}

fetchStatus();