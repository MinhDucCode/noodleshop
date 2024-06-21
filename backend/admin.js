function saveFeedback(name, phone, feedback) {
  let feedbackList = localStorage.getItem('feedbackList');
  if (!feedbackList) {
    feedbackList = [];
  } else {
    feedbackList = JSON.parse(feedbackList);
  }

  const newFeedback = {
    name: name,
    phone: phone,
    feedback: feedback
  };

  feedbackList.push(newFeedback);
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
}

function loadFeedback() {
  let storedFeedback = localStorage.getItem('feedbackList');
  if (storedFeedback) {
    return JSON.parse(storedFeedback);
  }
  return [];
}
function displayFeedback() {
  const feedbackList = loadFeedback();
  const feedbackContainer = document.getElementById('feedback-list');
  feedbackContainer.innerHTML = '';

  if (feedbackList.length === 0) {
    feedbackContainer.innerHTML = '<p>Chưa có dữ liệu góp ý nào.</p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('feedback-table');

  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
    <tr>
      <th>STT</th>
      <th>Họ và tên</th>
      <th>Số điện thoại</th>
      <th>Nội dung góp ý</th>
    </tr>
  `;
  table.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  feedbackList.forEach((feedback, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${feedback.name}</td>
      <td>${feedback.phone}</td>
      <td>${feedback.feedback}</td>
    `;
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  feedbackContainer.appendChild(table);
}
document.getElementById('feedback-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const feedback = document.getElementById('feedback').value;

  saveFeedback(name, phone, feedback);

  alert('Cảm ơn bạn đã gửi góp ý!');
  document.getElementById('feedback-form').reset();

  displayFeedback();
});

document.addEventListener('DOMContentLoaded', () => {
  displayFeedback();
});
