// Dữ liệu mẫu cho các đơn hàng
const ordersData = [
  {
    id: "#03",
    tables: ["Table 08", "Table Bar-2"],
    timeAgo: "15m ago",
    estimate: "15 min",
    status: "pending",
    items: [
      { name: "Salmon Sashimi", quantity: 2, status: "cooking", note: "" },
      { name: "Wagyu Burger", quantity: 1, status: "pending", note: "No onions, Medium Rare" },
      { name: "Truffle Ramen", quantity: 2, status: "smooth", note: "" }
    ],
    action: "start"
  },
  {
    id: "#04",
    tables: ["Table Bar-2"],
    timeAgo: "10m ago",
    estimate: "10 min",
    status: "pending",
    items: [
      { name: "Spicy Tuna Roll", quantity: 1, status: "pending", note: "" },
      { name: "Edamame", quantity: 1, status: "pending", note: "" }
    ],
    action: "start"
  },
  {
    id: "#05",
    tables: ["Table 12"],
    timeAgo: "22m ago",
    estimate: "8 min",
    status: "in-progress",
    items: [
      { name: "Caesar Salad", quantity: 1, status: "cooking", note: "" },
      { name: "Grilled Lobster", quantity: 1, status: "cooking", note: "Extra butter sauce" },
      { name: "Miso Soup", quantity: 1, status: "smooth", note: "" },
      { name: "Tempura Set", quantity: 1, status: "cooking", note: "" }
    ],
    action: "ready"
  },
  {
    id: "#02",
    tables: ["Table 03"],
    timeAgo: "35m ago",
    estimate: "20 min",
    status: "completed",
    items: [
      { name: "Steak Frites", quantity: 1, status: "ready", note: "" },
      { name: "Red Wine", quantity: 2, status: "ready", note: "" }
    ],
    action: "complete"
  }
];

// Biến toàn cục
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 3;

// Cập nhật thời gian
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const timeStr = `${hours}:${minutes}`;
  document.getElementById('current-time').textContent = timeStr;
  document.getElementById('update-time').textContent = timeStr;
}

// Cập nhật số lượng đơn hàng trên tab
function updateTabCounts() {
  const pending = ordersData.filter(order => order.status === "pending").length;
  const inProgress = ordersData.filter(order => order.status === "in-progress").length;
  const completed = ordersData.filter(order => order.status === "completed").length;
  const all = ordersData.length;

  document.getElementById('all-count').textContent = all;
  document.getElementById('pending-count').textContent = pending;
  document.getElementById('progress-count').textContent = inProgress;
  document.getElementById('completed-count').textContent = completed;
}

// Tạo HTML cho một đơn hàng
function createOrderCard(order) {
  // Tạo HTML cho các bàn
  let tablesHTML = '';
  order.tables.forEach(table => {
    tablesHTML += `
            <div class="table-badge">
                <i class="fas fa-chair"></i>
                ${table}
            </div>
        `;
  });

  // Tạo HTML cho các món ăn
  let itemsHTML = '';
  order.items.forEach((item, index) => {
    let statusClass = '';
    let statusText = '';

    switch(item.status) {
      case 'cooking':
        statusClass = 'status-cooking';
        statusText = 'COOKING';
        break;
      case 'pending':
        statusClass = 'status-pending';
        statusText = 'PENDING';
        break;
      case 'smooth':
        statusClass = 'status-smooth';
        statusText = 'SMOOTH';
        break;
      case 'ready':
        statusClass = 'status-ready';
        statusText = 'READY';
        break;
    }

    itemsHTML += `
            <div class="order-item" data-order="${order.id}" data-item="${index}">
                <div class="item-header">
                    <div class="item-name">
                        <span class="item-quantity">${item.quantity}</span>
                        ${item.name}
                    </div>
                    <div class="item-status ${statusClass}">${statusText}</div>
                </div>
                ${item.note ? `<div class="item-note">${item.note}</div>` : ''}
            </div>
        `;
  });

  // Xác định nút hành động
  let buttonHTML = '';
  let buttonClass = '';
  let buttonText = '';

  switch(order.action) {
    case 'start':
      buttonClass = 'start';
      buttonText = 'Start Order';
      break;
    case 'ready':
      buttonClass = 'ready';
      buttonText = 'Mark Ready';
      break;
    case 'complete':
      buttonClass = 'complete';
      buttonText = 'Order Completed';
      break;
  }

  // Trạng thái chung của đơn hàng
  let orderStatusBadge = '';
  let statusText = '';

  switch(order.status) {
    case 'pending':
      statusText = 'PENDING';
      orderStatusBadge = 'status-pending';
      break;
    case 'in-progress':
      statusText = 'IN PROGRESS';
      orderStatusBadge = 'status-cooking';
      break;
    case 'completed':
      statusText = 'COMPLETED';
      orderStatusBadge = 'status-ready';
      break;
  }

  return `
        <div class="order-card ${order.status}" data-status="${order.status}">
            <div class="order-header">
                <div class="order-id-row">
                    <div class="order-id">${order.id}</div>
                    <div class="order-status-badge ${orderStatusBadge}">${statusText}</div>
                </div>
                <div class="order-tables">
                    ${tablesHTML}
                </div>
                <div class="order-time-info">
                    <div class="time-ago">
                        <i class="far fa-clock"></i>
                        ${order.timeAgo}
                    </div>
                    <div class="time-estimate">
                        <i class="fas fa-hourglass-half"></i>
                        Est: ${order.estimate}
                    </div>
                </div>
            </div>
            <div class="order-items">
                ${itemsHTML}
            </div>
            <div class="order-actions">
                <button class="action-btn ${buttonClass}" onclick="handleOrderAction('${order.id}', '${order.action}')">
                    <i class="fas fa-${order.action === 'start' ? 'play' : order.action === 'ready' ? 'check' : 'clipboard-check'}"></i>
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
}

// Hiển thị đơn hàng với filter và pagination
function displayOrders() {
  const container = document.getElementById('orders-container');
  container.innerHTML = '';

  // Cập nhật tiêu đề phần
  let sectionTitle = '';
  switch(currentFilter) {
    case 'all':
      sectionTitle = 'All Orders';
      break;
    case 'pending':
      sectionTitle = 'Pending Orders';
      break;
    case 'in-progress':
      sectionTitle = 'Orders in Progress';
      break;
    case 'completed':
      sectionTitle = 'Completed Orders';
      break;
  }
  document.getElementById('section-title').textContent = sectionTitle;

  // Lọc đơn hàng
  let filteredOrders = ordersData;
  if (currentFilter !== 'all') {
    filteredOrders = ordersData.filter(order => order.status === currentFilter);
  }

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Hiển thị đơn hàng
  paginatedOrders.forEach(order => {
    container.innerHTML += createOrderCard(order);
  });

  // Cập nhật thông tin phân trang
  const startItem = filteredOrders.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(endIndex, filteredOrders.length);
  document.getElementById('page-info').textContent = `${startItem}-${endItem} / ${filteredOrders.length}`;

  // Thêm sự kiện click cho các món ăn
  document.querySelectorAll('.order-item').forEach(item => {
    item.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order');
      const itemIndex = this.getAttribute('data-item');
      showItemDetails(orderId, itemIndex);
    });
  });
}

// Xử lý chuyển tab
function setupTabNavigation() {
  const tabs = document.querySelectorAll('.simple-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Xóa active class từ tất cả các tab
      tabs.forEach(t => t.classList.remove('active'));
      // Thêm active class vào tab được click
      this.classList.add('active');

      // Cập nhật filter và hiển thị đơn hàng
      currentFilter = this.getAttribute('data-tab');
      currentPage = 1; // Reset về trang đầu
      displayOrders();
    });
  });
}

// Xử lý hành động đơn hàng
function handleOrderAction(orderId, action) {
  const orderIndex = ordersData.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return;

  const order = ordersData[orderIndex];

  switch(action) {
    case 'start':
      order.status = "in-progress";
      order.action = "ready";
      order.items.forEach(item => {
        if (item.status === "pending") {
          item.status = "cooking";
        }
      });
      showNotification(`Started cooking order ${orderId}`);
      break;

    case 'ready':
      order.status = "completed";
      order.action = "complete";
      order.items.forEach(item => {
        item.status = "ready";
      });
      showNotification(`Order ${orderId} marked as ready`);
      break;

    case 'complete':
      // Loại bỏ đơn hàng khỏi danh sách
      ordersData.splice(orderIndex, 1);
      showNotification(`Order ${orderId} completed`);
      break;
  }

  updateTabCounts();
  displayOrders();
}

// Hiển thị chi tiết món ăn
function showItemDetails(orderId, itemIndex) {
  const order = ordersData.find(order => order.id === orderId);
  if (!order || !order.items[itemIndex]) return;

  const item = order.items[itemIndex];

  let statusText = '';
  switch(item.status) {
    case 'cooking': statusText = 'Cooking'; break;
    case 'pending': statusText = 'Pending'; break;
    case 'smooth': statusText = 'Smooth (Preparation)'; break;
    case 'ready': statusText = 'Ready'; break;
  }

  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
        <div class="order-item">
            <div class="item-header">
                <div class="item-name">
                    <span class="item-quantity">${item.quantity}</span>
                    <span style="font-size: 1.3rem;">${item.name}</span>
                </div>
                <div class="item-status status-${item.status}">${statusText.toUpperCase()}</div>
            </div>
            <div style="margin-top: 20px;">
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Order:</strong> ${orderId}</p>
                <p><strong>Table:</strong> ${order.tables.join(', ')}</p>
                <p><strong>Time:</strong> ${order.timeAgo} (Est: ${order.estimate})</p>
                ${item.note ? `<p><strong>Special Instructions:</strong> ${item.note}</p>` : ''}
            </div>
        </div>
    `;

  document.getElementById('item-modal').style.display = 'flex';
}

// Hiển thị thông báo
function showNotification(message) {
  // Tạo thông báo tạm thời
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35, #FF8E53);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        z-index: 2000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Thêm CSS animation cho thông báo
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Khởi tạo ứng dụng
function initApp() {
  updateTime();
  updateTabCounts();
  displayOrders();
  setupTabNavigation();

  // Cập nhật thời gian mỗi phút
  setInterval(updateTime, 60000);

  // Sự kiện refresh
  document.getElementById('refresh-btn').addEventListener('click', function() {
    this.classList.add('rotating');
    setTimeout(() => {
      this.classList.remove('rotating');
      updateTabCounts();
      displayOrders();
      showNotification('Data refreshed successfully');
    }, 500);
  });

  // Thêm CSS cho hiệu ứng xoay
  const rotateStyle = document.createElement('style');
  rotateStyle.textContent = `
        .rotating {
            animation: rotate 0.5s ease;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(rotateStyle);

  // Sự kiện phân trang
  document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayOrders();
    }
  });

  document.getElementById('next-page').addEventListener('click', function() {
    const filteredOrders = currentFilter === 'all'
      ? ordersData
      : ordersData.filter(order => order.status === currentFilter);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      displayOrders();
    }
  });

  // Sự kiện đóng modal
  document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('item-modal').style.display = 'none';
  });

  // Đóng modal khi click bên ngoài
  document.getElementById('item-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });

  // Mô phỏng thêm đơn hàng mới sau 30 giây
  setInterval(() => {
    if (ordersData.length < 8) { // Giới hạn số lượng đơn
      const newId = `#${String(parseInt(ordersData[ordersData.length-1].id.slice(1)) + 1).toString().padStart(2, '0')}`;
      const tables = ["Table 05", "Table 09", "Table Bar-3", "Table 14"];
      const randomTable = tables[Math.floor(Math.random() * tables.length)];

      const newOrder = {
        id: newId,
        tables: [randomTable],
        timeAgo: "0m ago",
        estimate: `${Math.floor(Math.random() * 15) + 5} min`,
        status: "pending",
        items: [
          { name: "Margherita Pizza", quantity: Math.floor(Math.random() * 2) + 1, status: "pending", note: "" },
          { name: "Garlic Bread", quantity: Math.floor(Math.random() * 2) + 1, status: "pending", note: "" }
        ],
        action: "start"
      };

      ordersData.unshift(newOrder);
      updateTabCounts();

      if (currentFilter === 'all' || currentFilter === 'pending') {
        displayOrders();
        showNotification(`New order ${newId} received!`);
      }
    }
  }, 30000);
}

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', initApp);
