function updateStatus(index, statusBaru) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders[index].status = statusBaru;
  localStorage.setItem("orders", JSON.stringify(orders));
  tampilkanOrder();
}
