export async function copyUrl(url) {
  try {
    // ใช้ Clipboard API (สำหรับ modern browsers)
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    // Fallback สำหรับ older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackErr) {
      console.error('Failed to copy URL:', fallbackErr);
      return false;
    }
  }
}
