export const purchasesStatus = {
  inCart: -1, //sp trong giỏ hàng
  all: 0, // tất cả sp
  waitForConfirmation: 1, // sp đang đợi xác nhận từ phía shop
  waitForGetting: 2, // sp đang được lấy hàng
  inProgress: 3, // sp đang vận chuyển
  delivered: 4, // sp đã được giao
  cancelled: 5 // sp bị hủy
} as const
