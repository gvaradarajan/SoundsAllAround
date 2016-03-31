module ApplicationHelper
  def auth_token_input
    "<input
        type=\"hidden\"
        name=\"authenticity_token\"
        value=\"#{ form_authenticity_token }\">".html_safe
  end

  def sign_out_button
    <<-HTML.html_safe
    <form class="sign-out" action="#{api_session_url}" method="post">
      <input
          type=\"hidden\"
          name=\"authenticity_token\"
          value=\"#{ form_authenticity_token }\">
      <input type="hidden" name="_method" value="delete" />
      <input class="sign-out-button" type="submit" value="Sign Out"></input>
    </form>
    HTML
  end

  def sign_in_link
    <<-HTML.html_safe
    <a class="sign-in-link" href="#{new_session_url}">Sign In</a>
    HTML
  end

  def sign_up_link
    <<-HTML.html_safe
    <a class="sign-in-link" href="#{new_user_url}">Sign Up</a>
    HTML
  end
end
