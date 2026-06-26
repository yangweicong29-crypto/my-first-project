const services = [
  { id: 'cut', name: '精致剪发', duration: 45, price: 68, badge: '人气' },
  { id: 'wash', name: '洗剪吹造型', duration: 60, price: 98, badge: '推荐' },
  { id: 'color', name: '潮流染发', duration: 120, price: 288, badge: '新品' },
  { id: 'perm', name: '纹理烫发', duration: 150, price: 368, badge: '高级' },
];

const stylists = [
  { id: 'lin', name: '林老师', specialty: '短发设计 / 男士造型', rating: 4.9 },
  { id: 'chen', name: '陈老师', specialty: '染烫修护 / 发色建议', rating: 4.8 },
  { id: 'zhou', name: '周老师', specialty: '女发层次 / 日常打理', rating: 4.9 },
];

const timeSlots = ['10:00', '11:00', '13:30', '15:00', '16:30', '18:00', '19:30'];
const state = { service: services[0].id, appointments: [] };

const elements = {
  serviceGrid: document.querySelector('#service-grid'),
  stylist: document.querySelector('#stylist'),
  date: document.querySelector('#date'),
  time: document.querySelector('#time'),
  form: document.querySelector('#booking-form'),
  name: document.querySelector('#customer-name'),
  phone: document.querySelector('#phone'),
  note: document.querySelector('#note'),
  previewService: document.querySelector('#preview-service'),
  previewTime: document.querySelector('#preview-time'),
  previewDetail: document.querySelector('#preview-detail'),
  submitButton: document.querySelector('#submit-btn'),
  emptyState: document.querySelector('#empty-state'),
  appointmentList: document.querySelector('#appointment-list'),
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function selectedService() {
  return services.find((service) => service.id === state.service);
}

function selectedStylist() {
  return stylists.find((stylist) => stylist.id === elements.stylist.value);
}

function renderServices() {
  elements.serviceGrid.innerHTML = services.map((service) => `
    <button class="option ${state.service === service.id ? 'active' : ''}" type="button" data-service="${service.id}">
      <span class="badge">${service.badge}</span>
      <strong>${service.name}</strong>
      <small>${service.duration} 分钟 · ¥${service.price}</small>
    </button>
  `).join('');
}

function renderOptions() {
  elements.stylist.innerHTML = stylists.map((stylist) => `
    <option value="${stylist.id}">${stylist.name} · ${stylist.specialty} · ${stylist.rating} 分</option>
  `).join('');
  elements.time.innerHTML = timeSlots.map((slot) => `<option value="${slot}">${slot}</option>`).join('');
  elements.date.min = getToday();
  elements.date.value = getToday();
}

function renderPreview() {
  const service = selectedService();
  const stylist = selectedStylist();
  elements.previewService.textContent = service.name;
  elements.previewTime.textContent = `${elements.date.value} ${elements.time.value}`;
  elements.previewDetail.textContent = `${stylist.name} · 预计 ${service.duration} 分钟`;
  elements.submitButton.textContent = `确认预约 ¥${service.price}`;
}

function renderAppointments() {
  elements.emptyState.hidden = state.appointments.length > 0;
  elements.appointmentList.innerHTML = state.appointments.map((item) => `
    <li>
      <strong>${item.serviceName}</strong>
      <span>${item.date} ${item.time} · ${item.stylistName}</span>
      <small>${item.name} · ¥${item.price}</small>
    </li>
  `).join('');
}

function createAppointment(event) {
  event.preventDefault();
  const name = elements.name.value.trim();
  const phone = elements.phone.value.trim();
  if (!name || !/^1[3-9]\d{9}$/.test(phone)) {
    alert('请填写姓名，并输入正确的 11 位手机号。');
    return;
  }

  const service = selectedService();
  const stylist = selectedStylist();
  state.appointments.unshift({
    id: Date.now(),
    serviceName: service.name,
    stylistName: stylist.name,
    date: elements.date.value,
    time: elements.time.value,
    name,
    price: service.price,
  });
  elements.name.value = '';
  elements.phone.value = '';
  elements.note.value = '';
  renderAppointments();
}

function bindEvents() {
  elements.serviceGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-service]');
    if (!button) return;
    state.service = button.dataset.service;
    renderServices();
    renderPreview();
  });
  [elements.stylist, elements.date, elements.time].forEach((element) => {
    element.addEventListener('change', renderPreview);
  });
  elements.form.addEventListener('submit', createAppointment);
}

renderOptions();
renderServices();
renderPreview();
renderAppointments();
bindEvents();
