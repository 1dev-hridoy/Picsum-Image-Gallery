let page = 1;
let loading = false;
let selectedAuthor = null;

const imageContainer = document.getElementById('image-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const loadingModal = document.getElementById('loading-modal');

function showLoadingModal() {
    loadingModal.classList.remove('hidden');
    loadingModal.classList.add('flex');
}

function hideLoadingModal() {
    loadingModal.classList.add('hidden');
    loadingModal.classList.remove('flex');
}

async function fetchImages() {
    if (loading) return;
    loading = true;
    showLoadingModal();

    const url = selectedAuthor
        ? `https://picsum.photos/v2/list?page=${page}&limit=20&author=${encodeURIComponent(selectedAuthor)}`
        : `https://picsum.photos/v2/list?page=${page}&limit=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        renderImages(data);
        page++;
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        loading = false;
        hideLoadingModal();
    }
}

function renderImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'relative group cursor-pointer';
        imgElement.innerHTML = `
            <img src="${image.download_url}" alt="${image.author}" class="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <p class="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">${image.author}</p>
            </div>
        `;
        imgElement.addEventListener('click', () => showImageDetails(image));
        imageContainer.appendChild(imgElement);
    });
}

async function showImageDetails(image) {
    showLoadingModal();
    const response = await fetch(`https://picsum.photos/id/${image.id}/info`);
    const details = await response.json();
    hideLoadingModal();

    modalContent.innerHTML = `
        <img src="${details.download_url}" alt="${details.author}" class="w-full h-64 object-cover rounded-lg mb-4 shadow-lg">
        <h2 class="text-2xl font-bold mb-2 cursor-pointer hover:text-blue-600 transition-colors duration-300" id="author-name">${details.author}</h2>
        <p class="text-gray-600 mb-2">Width: ${details.width}px | Height: ${details.height}px</p>
        <a href="${details.url}" target="_blank" class="text-blue-500 hover:underline block mb-4">View on Unsplash</a>
        <button id="download-btn" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">Download Image</button>
    `;

    document.getElementById('download-btn').addEventListener('click', () => downloadImage(details.download_url, `${details.author}-${details.id}.jpg`));
    document.getElementById('author-name').addEventListener('click', () => filterByAuthor(details.author));

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.querySelector('.modal-content').classList.remove('closing');
}

function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
}

function filterByAuthor(author) {
    selectedAuthor = author;
    imageContainer.innerHTML = '';
    page = 1;
    fetchImages();
    closeModalHandler();
}

function closeModalHandler() {
    const modalContentElement = modal.querySelector('.modal-content');
    modalContentElement.classList.add('closing');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modalContentElement.classList.remove('closing');
    }, 300);
}

closeModal.addEventListener('click', closeModalHandler);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        fetchImages();
    }
});

fetchImages();