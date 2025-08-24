function ProfileImage({ src, alt, width, height }) {
  return (
    <div className={`${width} ${height} rounded-full overflow-hidden`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export default ProfileImage;
