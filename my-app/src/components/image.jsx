import { useState } from "react";
function ProfilePic() {
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary "Blob" URL for the <img> tag
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-container">
      {/* 1. THE PHOTO FRAME (Shows the result) */}
      <img 
        src={preview || "https://via.placeholder.com/150"} 
        alt="User Profile" 
        className="profile-circle"
      />

      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImage} 
      />
    </div>
  );
}
export default ProfilePic;