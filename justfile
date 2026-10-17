# Run the development server, including draft posts.
server:
    mise exec -- hugo server -D

# Create a draft hours post from the hours archetype.
new-hours hours:
    mise exec -- hugo new content 'hours/{{hours}}-hours.md'

# Create a compartir post from the compartir archetype.
new-compartir slug:
    mise exec -- hugo new content 'compartir/{{slug}}.md'
