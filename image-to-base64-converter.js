// Image to Base64 Converter
// developed by Tawhidur Rahman Dear, https://www.tawhidurrahmandear.com
// Live Preview available at https://www.devilhunter.net/p/image-to-base64-converter.html

document.addEventListener('DOMContentLoaded', () => {
  const dragAndDropArea = document.getElementById('drag-and-drop');
  const fileInput = document.getElementById('file-select'); 
  const convertButton = document.getElementById('submit'); 
  const base64Output = document.getElementById('image-to-base64-text'); 

  let selectedFile = null;

  function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.bottom = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.padding = '10px 20px';
    alertDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    alertDiv.style.color = '#fff';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.zIndex = 1000;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000);
  }

  dragAndDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragAndDropArea.classList.add('hover');
  });

  dragAndDropArea.addEventListener('dragleave', () => {
    dragAndDropArea.classList.remove('hover');
  });

  dragAndDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dragAndDropArea.classList.remove('hover');
    const file = event.dataTransfer.files[0];
    handleFileSelection(file);
  });

  dragAndDropArea.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleFileSelection(file);
  });

  function handleFileSelection(file) {
    if (!file) {
      showAlert('No file selected. Please try again.');
      return;
    }

    console.log(`File selected: ${file.name} | Type: ${file.type}`);
    if (file.type.startsWith('image/')) {
      selectedFile = file;
      convertButton.disabled = false;
      dragAndDropArea.innerText = `Selected file: ${file.name}`;
    } else {
      showAlert('Please select a valid image file.');
      convertButton.disabled = true;
      dragAndDropArea.innerText = 'Drag and drop an image here or click to select';
    }
  }

  convertButton.addEventListener('click', () => {
    if (!selectedFile) {
      showAlert('No file selected. Please select an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      console.log('Base64 conversion completed.');
      base64Output.value = base64;
    };

    reader.onerror = () => {
      showAlert('Error reading the file. Please try again.');
    };

    reader.readAsDataURL(selectedFile);
  });
});