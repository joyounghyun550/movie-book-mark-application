import { hideModal } from "../ui/modal.js";

// 알림을 표시하는 함수
async function showNotification(message) {
  const result = await Swal.fire({
    icon: "success", // 알림 아이콘
    title: message, // 알림 메시지
  });
  if (result.isConfirmed) {
    hideModal(); // 알림 확인 시 모달 닫기
  }
}

export { showNotification };
