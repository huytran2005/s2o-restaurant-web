// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const mainContent = document.querySelector('.main-content');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const logoutBtn = document.getElementById('logoutBtn');
const addMenuItemBtn = document.getElementById('addMenuItemBtn');
const addTableBtn = document.getElementById('addTableBtn');
const addStaffBtn = document.getElementById('addStaffBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const closeModalButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');
const saveMenuItemBtn = document.getElementById('saveMenuItemBtn');
const saveEditMenuItemBtn = document.getElementById('saveEditMenuItemBtn');
const saveTableBtn = document.getElementById('saveTableBtn');
const saveStaffBtn = document.getElementById('saveStaffBtn');
const menuItemsContainer = document.getElementById('menuItemsContainer');
const tablesContainer = document.getElementById('tablesContainer');
const ordersContainer = document.getElementById('ordersContainer');
const staffContainer = document.getElementById('staffContainer');
const menuSearch = document.getElementById('menuSearch');
const staffSearch = document.getElementById('staffSearch');
const orderSearch = document.getElementById('orderSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const statusFilterButtons = document.querySelectorAll('.status-filter-btn');
const categoryFilterButtons = document.querySelectorAll('.category-filter-btn');
const roleFilterButtons = document.querySelectorAll('.role-filter-btn');

// Sample data
let menuItems = [
  { id: 1, name: 'Grilled Salmon', category: 'main', price: 20.00, discount: 0, inStock: true, image: null },
  { id: 2, name: 'Chicken Wings', category: 'appetizer', price: 16.00, discount: 44, inStock: true, image: null },
  { id: 3, name: 'Beef Burger', category: 'main', price: 17.65, discount: 15, inStock: true, image: null },
  { id: 4, name: 'Mushroom Risotto', category: 'main', price: 14.00, discount: 0, inStock: true, image: null },
  { id: 5, name: 'Fish & Chips', category: 'main', price: 13.00, discount: 0, inStock: true, image: null },
  { id: 6, name: 'Caesar Salad', category: 'appetizer', price: 11.00, discount: 0, inStock: true, image: null },
  { id: 7, name: 'Pasta Carbonara', category: 'main', price: 14.00, discount: 0, inStock: true, image: null },
  { id: 8, name: 'Tiramisu', category: 'dessert', price: 10.67, discount: 25, inStock: true, image: null }
];

let tables = [
  { id: 1, name: 'Table 1', seats: 4, status: 'served' },
  { id: 2, name: 'Table 2', seats: 2, status: 'waiting' },
  { id: 3, name: 'Table 3', seats: 6, status: 'empty' },
  { id: 4, name: 'Table 4', seats: 4, status: 'served' },
  { id: 5, name: 'Table 5', seats: 8, status: 'waiting' },
  { id: 6, name: 'Table 6', seats: 2, status: 'cleaning' },
  { id: 7, name: 'Table 7', seats: 4, status: 'empty' },
  { id: 8, name: 'Table 8', seats: 6, status: 'served' },
  { id: 9, name: 'Table 9', seats: 4, status: 'waiting' },
  { id: 10, name: 'Table 10', seats: 2, status: 'empty' },
  { id: 11, name: 'Table 11', seats: 8, status: 'served' },
  { id: 12, name: 'Table 12', seats: 4, status: 'empty' },
  { id: 13, name: 'VIP 1', seats: 10, status: 'served' },
  { id: 14, name: 'VIP 2', seats: 12, status: 'waiting' },
  { id: 15, name: 'Bar 1', seats: 2, status: 'served' },
  { id: 16, name: 'Bar 2', seats: 2, status: 'empty' }
];

let staffMembers = [
  { id: 1, name: 'John Smith', email: 'john@restaurant.com', role: 'manager', shift: 'morning', hours: 42, initials: 'JS' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@restaurant.com', role: 'server', shift: 'afternoon', hours: 35, initials: 'SJ' },
  { id: 3, name: 'Mike Chen', email: 'mike@restaurant.com', role: 'chef', shift: 'morning', hours: 45, initials: 'MC' },
  { id: 4, name: 'Emily Davis', email: 'emily@restaurant.com', role: 'server', shift: 'evening', hours: 28, initials: 'ED' }
];

let orders = [
  {
    id: 'ORD-001', table: 'Table 1', time: '12:45', status: 'pending', items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.00 },
      { name: 'Caesar Salad', quantity: 1, price: 11.00 }
    ]
  },
  {
    id: 'ORD-002', table: 'Table 5', time: '12:50', status: 'preparing', items: [
      { name: 'Beef Burger', quantity: 3, price: 15.00 },
      { name: 'Fish & Chips', quantity: 2, price: 26.00 },
      { name: 'Lemonade', quantity: 5, price: 20.00 }
    ]
  },
  {
    id: 'ORD-003', table: 'VIP 1', time: '12:30', status: 'ready', items: [
      { name: 'Grilled Salmon', quantity: 4, price: 80.00 },
      { name: 'Mushroom Risotto', quantity: 2, price: 28.00 },
      { name: 'Tiramisu', quantity: 4, price: 32.00 }
    ]
  },
  {
    id: 'ORD-004', table: 'Bar 1', time: '12:15', status: 'served', items: [
      { name: 'Chicken Wings', quantity: 2, price: 18.00 },
      { name: 'Pasta Carbonara', quantity: 2, price: 28.00 },
      { name: 'Caesar Salad', quantity: 2, price: 22.00 }
    ]
  }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  renderMenuItems();
  renderTables();
  renderOrders();
  renderStaff();
  setupEventListeners();
  updateDashboardStats();
});

// Set up all event listeners
function setupEventListeners() {
  menuToggle.addEventListener('click', toggleSidebar);
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchPage(item.dataset.page);
    });
  });
  logoutBtn.addEventListener('click', () => {
    alert('Logged out successfully!');
  });

  addMenuItemBtn.addEventListener('click', () => openModal('addItemModal'));
  addTableBtn.addEventListener('click', () => openModal('addTableModal'));
  addStaffBtn.addEventListener('click', () => openModal('addStaffModal'));

  // Image upload handlers
  const imageUpload = document.getElementById('imageUpload');
  const itemImage = document.getElementById('itemImage');
  const imagePreview = document.getElementById('imagePreview');
  const editImageUpload = document.getElementById('editImageUpload');
  const editItemImage = document.getElementById('editItemImage');
  const editImagePreview = document.getElementById('editImagePreview');

  if (imageUpload && itemImage) {
    imageUpload.addEventListener('click', () => itemImage.click());
    itemImage.addEventListener('change', (e) => handleImageUpload(e, imagePreview));
  }

  if (editImageUpload && editItemImage) {
    editImageUpload.addEventListener('click', () => editItemImage.click());
    editItemImage.addEventListener('change', (e) => handleImageUpload(e, editImagePreview));
  }

  closeModalButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });

  saveMenuItemBtn.addEventListener('click', addMenuItem);
  saveEditMenuItemBtn.addEventListener('click', updateMenuItem);
  saveTableBtn.addEventListener('click', addTable);
  saveStaffBtn.addEventListener('click', addStaffMember);
  saveSettingsBtn.addEventListener('click', saveSettings);

  menuSearch.addEventListener('input', filterMenuItems);
  categoryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterMenuItems();
    });
  });

  staffSearch.addEventListener('input', filterStaff);
  roleFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      roleFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterStaff();
    });
  });

  orderSearch.addEventListener('input', filterOrders);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterTables(button.dataset.filter);
    });
  });

  statusFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      statusFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterOrdersByStatus(button.dataset.status);
    });
  });
}

// Toggle sidebar
function toggleSidebar() {
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('expanded');
}

// Switch page
function switchPage(pageId) {
  const pageTitle = document.querySelector('.page-title');
  pageTitle.textContent = pageId.charAt(0).toUpperCase() + pageId.slice(1);

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === pageId) {
      item.classList.add('active');
    }
  });

  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === pageId) {
      page.classList.add('active');
    }
  });
}

// Open modal
function openModal(modalId) {
  closeAllModals();
  document.getElementById(modalId).classList.add('active');
}

// Close all modals
function closeAllModals() {
  modals.forEach(modal => modal.classList.remove('active'));
}

// Render menu items
function renderMenuItems(filteredItems = menuItems) {
  menuItemsContainer.innerHTML = '';
  filteredItems.forEach(item => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    const discountBadge = item.discount > 0 ? `<div class="menu-item-badge">-${item.discount}%</div>` : '';

    const menuItemElement = document.createElement('div');
    menuItemElement.className = 'menu-item';
    menuItemElement.innerHTML = `
        <div class="menu-item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">` : `<i class="fas fa-utensils"></i>`}
            ${discountBadge}
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <div class="menu-item-actions">
                    <div class="action-btn edit" data-id="${item.id}">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="action-btn delete" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
            <span class="menu-item-category">${getCategoryName(item.category)}</span>
            <div class="menu-item-prices">
                ${item.discount > 0 ? `
                    <span class="menu-item-original-price">$${item.price.toFixed(2)}</span>
                    <span class="menu-item-price">$${discountedPrice.toFixed(2)}</span>
                    <span class="menu-item-discount">-${item.discount}%</span>
                ` : `
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                `}
            </div>
            <div class="menu-item-footer">
                <div class="menu-item-stock">
                    <i class="fas ${item.inStock ? 'fa-check-circle in-stock' : 'fa-times-circle out-of-stock'}"></i>
                    <span>${item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
            </div>
        </div>
    `;

    menuItemsContainer.appendChild(menuItemElement);
  });

  document.querySelectorAll('.menu-item .edit').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      editMenuItem(parseInt(button.dataset.id));
    });
  });

  document.querySelectorAll('.menu-item .delete').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteMenuItem(parseInt(button.dataset.id));
    });
  });

  updateDashboardStats();
}

function getCategoryName(categoryCode) {
  switch (categoryCode) {
    case 'main': return 'Main Course';
    case 'appetizer': return 'Appetizer';
    case 'dessert': return 'Dessert';
    case 'drink': return 'Drink';
    default: return 'Other';
  }
}

function handleImageUpload(e, previewElement) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewElement.style.display = 'block';
      previewElement.querySelector('img').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function filterMenuItems() {
  const searchTerm = menuSearch.value.toLowerCase();
  const activeButton = document.querySelector('.category-filter-btn.active');
  const category = activeButton ? activeButton.dataset.category : 'all';

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  renderMenuItems(filteredItems);
}

function addMenuItem() {
  const name = document.getElementById('itemName').value;
  const category = document.getElementById('itemCategory').value;
  const price = parseFloat(document.getElementById('itemPrice').value);
  const imagePreview = document.getElementById('imagePreview');
  const image = imagePreview.style.display === 'block' ? imagePreview.querySelector('img').src : null;

  if (!name || price <= 0) {
    alert('Please enter a valid item name and price.');
    return;
  }

  const newItem = {
    id: menuItems.length + 1,
    name,
    category,
    price,
    discount: 0,
    inStock: true,
    image
  };

  menuItems.push(newItem);
  renderMenuItems();
  closeAllModals();
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '0.00';
  document.getElementById('itemImage').value = '';
  imagePreview.style.display = 'none';
}

function editMenuItem(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  if (!item) return;

  document.getElementById('editItemName').value = item.name;
  document.getElementById('editItemCategory').value = item.category;
  document.getElementById('editItemPrice').value = item.price.toFixed(2);
  document.getElementById('editItemDiscount').value = item.discount;
  document.getElementById('editItemInStock').checked = item.inStock;

  const editImagePreview = document.getElementById('editImagePreview');
  if (item.image) {
    editImagePreview.style.display = 'block';
    editImagePreview.querySelector('img').src = item.image;
  } else {
    editImagePreview.style.display = 'none';
    editImagePreview.querySelector('img').src = '';
  }

  document.getElementById('editItemModal').dataset.editingId = itemId;
  openModal('editItemModal');
}

function updateMenuItem() {
  const itemId = parseInt(document.getElementById('editItemModal').dataset.editingId);
  const itemIndex = menuItems.findIndex(item => item.id === itemId);

  if (itemIndex === -1) return;

  const editImagePreview = document.getElementById('editImagePreview');
  const image = editImagePreview.querySelector('img').src;

  menuItems[itemIndex].name = document.getElementById('editItemName').value;
  menuItems[itemIndex].category = document.getElementById('editItemCategory').value;
  menuItems[itemIndex].price = parseFloat(document.getElementById('editItemPrice').value);
  menuItems[itemIndex].discount = parseInt(document.getElementById('editItemDiscount').value);
  menuItems[itemIndex].inStock = document.getElementById('editItemInStock').checked;
  menuItems[itemIndex].image = image && image !== '' ? image : null;

  renderMenuItems();
  closeAllModals();
  updateDashboardStats();
}

function deleteMenuItem(itemId) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    menuItems = menuItems.filter(item => item.id !== itemId);
    renderMenuItems();
    updateDashboardStats();
  }
}

// Render tables
function renderTables(filteredTables = tables) {
  tablesContainer.innerHTML = '';
  filteredTables.forEach(table => {
    const tableElement = document.createElement('div');
    tableElement.className = 'table-card';
    tableElement.innerHTML = `
        <div class="table-status ${table.status}"></div>
        <h3 class="table-name">${table.name}</h3>
        <div class="table-seats">
            <i class="fas fa-user"></i>
            <span>${table.seats} seats</span>
        </div>
        <div class="table-label">Status</div>
        <div class="table-status-text">${getTableStatusText(table.status)}</div>
    `;
    tablesContainer.appendChild(tableElement);
  });
}

function getTableStatusText(status) {
  switch (status) {
    case 'empty': return 'Empty';
    case 'waiting': return 'Waiting for dish';
    case 'served': return 'Served';
    case 'cleaning': return 'Needs cleaning';
    default: return 'Unknown';
  }
}

function filterTables(filter) {
  let filteredTables;
  if (filter === 'all') {
    filteredTables = tables;
  } else {
    filteredTables = tables.filter(table => table.status === filter);
  }
  renderTables(filteredTables);
}

function addTable() {
  const name = document.getElementById('tableName').value;
  const seats = parseInt(document.getElementById('tableSeats').value);

  if (!name) {
    alert('Please enter a table name.');
    return;
  }

  const newTable = {
    id: tables.length + 1,
    name,
    seats,
    status: 'empty'
  };

  tables.push(newTable);
  renderTables();
  closeAllModals();
  document.getElementById('tableName').value = '';
  document.getElementById('tableSeats').value = '4';
  updateTableFilterCounts();
}

function updateTableFilterCounts() {
  const emptyCount = tables.filter(table => table.status === 'empty').length;
  const waitingCount = tables.filter(table => table.status === 'waiting').length;
  const servedCount = tables.filter(table => table.status === 'served').length;
  const cleaningCount = tables.filter(table => table.status === 'cleaning').length;

  document.querySelectorAll('.count').forEach(countElement => {
    const filterBtn = countElement.closest('.filter-btn');
    if (filterBtn) {
      const filter = filterBtn.dataset.filter;
      switch (filter) {
        case 'empty':
          countElement.textContent = emptyCount;
          break;
        case 'waiting':
          countElement.textContent = waitingCount;
          break;
        case 'served':
          countElement.textContent = servedCount;
          break;
        case 'cleaning':
          countElement.textContent = cleaningCount;
          break;
      }
    }
  });
}

// Render orders
function renderOrders(filteredOrders = orders) {
  ordersContainer.innerHTML = '';
  filteredOrders.forEach(order => {
    const total = order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const orderElement = document.createElement('div');
    orderElement.className = 'order-card';
    orderElement.innerHTML = `
        <div class="order-header">
            <div>
                <div class="order-id">${order.id}</div>
                <div class="order-time">${order.table} • ${order.time}</div>
            </div>
            <div class="order-status-badge ${order.status}" data-order-id="${order.id}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
        </div>
        <div class="order-body">
            ${order.items.map(item => `
                <div class="order-item">
                    <div>
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-quantity">${item.quantity}x</div>
                    </div>
                    <div class="order-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
        <div class="order-total">
            <div class="total-label">Total</div>
            <div class="total-amount">$${total.toFixed(2)}</div>
        </div>
        <div class="order-actions"></div>
    `;

    ordersContainer.appendChild(orderElement);

    const badge = orderElement.querySelector('.order-status-badge');
    const actionsContainer = orderElement.querySelector('.order-actions');

    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    function renderActions() {
      actionsContainer.innerHTML = '';
      if (order.status === 'served') {
        const btnPrint = document.createElement('button');
        btnPrint.className = 'btn-primary';
        btnPrint.style.flex = '1';
        btnPrint.innerHTML = '<i class="fas fa-print"></i> Print';
        actionsContainer.appendChild(btnPrint);
        btnPrint.addEventListener('click', () => { window.print(); });
      } else {
        const btnPrint = document.createElement('button');
        btnPrint.className = 'btn-secondary';
        btnPrint.style.flex = '1';
        btnPrint.innerHTML = '<i class="fas fa-print"></i> Print';
        const btnNext = document.createElement('button');
        btnNext.className = 'btn-primary';
        btnNext.style.flex = '1';
        btnNext.textContent = 'Next Step';
        actionsContainer.appendChild(btnPrint);
        actionsContainer.appendChild(btnNext);
        btnPrint.addEventListener('click', () => { window.print(); });
        btnNext.addEventListener('click', () => { advanceStatus(); });
      }
    }

    function advanceStatus() {
      const statuses = ['pending', 'preparing', 'ready', 'served'];
      const currentIndex = statuses.indexOf(order.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      order.status = statuses[nextIndex];
      if (badge) {
        badge.className = 'order-status-badge ' + order.status;
        badge.textContent = capitalize(order.status);
      }
      renderActions();
    }

    if (badge) {
      badge.style.cursor = 'pointer';
      badge.addEventListener('click', advanceStatus);
    }

    renderActions();
  });
}

function filterOrders() {
  const searchTerm = orderSearch.value.toLowerCase();
  const filteredOrders = orders.filter(order => {
    return order.id.toLowerCase().includes(searchTerm) ||
      order.table.toLowerCase().includes(searchTerm);
  });
  renderOrders(filteredOrders);
}

function filterOrdersByStatus(status) {
  let filteredOrders;
  if (status === 'all') {
    filteredOrders = orders;
  } else {
    filteredOrders = orders.filter(order => order.status === status);
  }
  renderOrders(filteredOrders);
}

// Render staff
function renderStaff(filteredStaff = staffMembers) {
  staffContainer.innerHTML = '';
  filteredStaff.forEach(staff => {
    const shiftText = getShiftText(staff.shift);
    const staffElement = document.createElement('div');
    staffElement.className = 'staff-card';
    staffElement.innerHTML = `
        <div class="staff-avatar">${staff.initials}</div>
        <div class="staff-info">
            <h3 class="staff-name">${staff.name}</h3>
            <p class="staff-email">${staff.email}</p>
            <div class="staff-details">
                <div class="staff-detail">
                    <i class="fas fa-briefcase"></i>
                    <span>${staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}</span>
                </div>
                <div class="staff-detail">
                    <i class="fas fa-clock"></i>
                    <span>Shift: ${shiftText}</span>
                </div>
                <div class="staff-detail">
                    <i class="fas fa-chart-line"></i>
                    <span>Hours this week: <span class="staff-hours">${staff.hours}h</span></span>
                </div>
            </div>
        </div>
    `;
    staffContainer.appendChild(staffElement);
  });
}

function getShiftText(shift) {
  switch (shift) {
    case 'morning': return '06:00 - 14:00';
    case 'afternoon': return '14:00 - 22:00';
    case 'evening': return '18:00 - 02:00';
    default: return 'Not specified';
  }
}

function filterStaff() {
  const searchTerm = staffSearch.value.toLowerCase();
  const activeButton = document.querySelector('.role-filter-btn.active');
  const role = activeButton ? activeButton.dataset.role : 'all';

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm) ||
      staff.email.toLowerCase().includes(searchTerm);
    const matchesRole = role === 'all' || staff.role === role;
    return matchesSearch && matchesRole;
  });

  renderStaff(filteredStaff);
}

function addStaffMember() {
  const name = document.getElementById('staffName').value;
  const email = document.getElementById('staffEmail').value;
  const role = document.getElementById('staffRole').value;
  const shift = document.getElementById('staffShift').value;

  if (!name || !email) {
    alert('Please enter a valid name and email.');
    return;
  }

  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  const newStaff = {
    id: staffMembers.length + 1,
    name,
    email,
    role,
    shift,
    hours: Math.floor(Math.random() * 20) + 30,
    initials
  };

  staffMembers.push(newStaff);
  renderStaff();
  closeAllModals();
  document.getElementById('staffName').value = '';
  document.getElementById('staffEmail').value = '';
}

function saveSettings() {
  alert('Settings saved successfully!');
  closeAllModals();
}

function updateDashboardStats() {
  const discountItems = menuItems.filter(item => item.discount > 0);
  document.querySelector('.stat-card .stat-value').textContent = `${discountItems.length} items`;

  const discountsSection = document.querySelector('.discount-items');
  discountsSection.innerHTML = '';

  discountItems.forEach(item => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    const discountElement = document.createElement('div');
    discountElement.className = 'discount-item';
    discountElement.innerHTML = `
        <div class="discount-info">
            <h4>${item.name}</h4>
            <p>${getCategoryName(item.category)}</p>
        </div>
        <div class="discount-prices">
            <span class="original-price">$${item.price.toFixed(2)}</span>
            <span class="discounted-price">$${discountedPrice.toFixed(2)}</span>
            <span class="discount-percent">-${item.discount}%</span>
        </div>
    `;
    discountsSection.appendChild(discountElement);
  });
}

updateTableFilterCounts();
