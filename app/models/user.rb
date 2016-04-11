class User < ActiveRecord::Base
  has_attached_file :image, default_url: "/assets/images/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :username, :email, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :playlists

  has_many(
    :uploaded_tracks,
    class_name: "Track",
    primary_key: :id,
    foreign_key: :artist_id
  )

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && (user.is_password?(password) ? user : nil)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.base64(16)
    self.save
    self.session_token
  end

  private

  def ensure_session_token
    return unless self.session_token.nil?
    self.session_token = SecureRandom.base64(16)
  end

end
