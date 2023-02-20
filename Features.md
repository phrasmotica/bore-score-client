# BoreScore features

## Client

### Groups page

- show table of groups, similar to Games and Results pages
  - only show global and public groups if not admin user
- show group name, description, image, member count, visibility, creation date
- group name is hyperlink to group details page
- show "Submit Result" button against each group, which shows the Add Result modal with the group already set

### Group details page

- should look similar to player details page
- return 403 if group is private and user is not a member ("You do not have permission to view this page" or similar)
- show group name, image, list of members, creation date
- show delete button (if admin user)
- show button/link to view league tables (if user is part of the group)

### League tables for a group

- table of wins/draws/losses in head-to-head games
  - default across all games
    - allow filtering to results between a start and end date
    - allow filtering to results involving a certain player
  - default 3 points for a win, 1 for a draw, 0 for a loss
    - allow customising these points
  - default sort by points total descending, then number of wins descending, then alphabetical ascending

- table of results in multiplayer/multi-team games
  - TODO: figure out specifics of this

## API

### Users, passwords, logins, etc

- allow admin to create new users
