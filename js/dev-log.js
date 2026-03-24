const GITHUB_USERNAME = 'sujankumarroy'
const REPO_NAME = 'Knowlet'

async function fetchRepoInfo(){
    const box = document.getElementById('repo-info')

    try{
        const repoRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}`
        )
        const repo = await repoRes.json()

        // Latest release
        let latestRelease = 'No releases'
        try{
            const releaseRes = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/releases/latest`
            )
            if(releaseRes.ok){
                const release = await releaseRes.json()
                latestRelease = release.tag_name
            }
        }catch{}

        // Contributors (limit to 6)
        const contributorsRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contributors?per_page=6`
        )
        const contributors = await contributorsRes.json()

        // Recent merge count
        const commitsRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?per_page=100`
        )
        const commits = await commitsRes.json()
        const mergeCount = commits.filter(
            c => c.parents.length >= 2
        ).length

        const updatedAgo = getTimeAgo(new Date(repo.updated_at))

        const created = new Date(repo.created_at)
            .toLocaleDateString('en-US',{
                month:'short',
                day:'numeric',
                year:'numeric'
            })

        const ownerAvatar = repo.owner.avatar_url
        const ownerProfile = repo.owner.html_url
        const ownerName = repo.owner.login
        const contributorsHTML = contributors.map(user => `
            <a href="${user.html_url}" target="_blank" class="contributor">
                <img src="${user.avatar_url}" alt="${user.login}">
                <span>${user.login}</span>
            </a>
        `).join('')

        box.innerHTML = `
            <div class="repo-owner">
                <img src="${ownerAvatar}" class="owner-avatar">
                <a href="${ownerProfile}" target="_blank">
                    ${ownerName}
                </a>
            </div>

            <h2>${repo.full_name}</h2>
            <p>${repo.description || 'No description available'}</p>

            <div class="repo-stats">

                <span>⭐ ${repo.stargazers_count} stars</span>
                <span>👀 ${repo.watchers_count} watchers</span>
                <span>🍴 ${repo.forks_count} forks</span>
                <span>🐛 ${repo.open_issues_count} issues</span>

                <span>🔀 ${mergeCount} recent merges</span>
                <span>🏷 Latest release: ${latestRelease}</span>

                <span>🌿 Branch: ${repo.default_branch}</span>
                <span>📦 Size: ${(repo.size / 1024).toFixed(2)} MB</span>

                <span>📅 Created: ${created}</span>
                <span>🕒 Updated ${updatedAgo}</span>

                <span>📜 License: ${repo.license?.name || 'None'}</span>
                <span>🗄 ${repo.archived ? 'Archived' : 'Active'}</span>

                ${repo.homepage ? `<span>🌐 ${repo.homepage}</span>` : ''}

                <div class="contributors">
                    <h3>Contributors</h3>
                    <div class="contributors-list">
                        ${contributorsHTML || '<span>No contributors</span>'}
                    </div>
                </div>

                <a href="${repo.html_url}" target="_blank">
                    View on GitHub
                </a>

            </div>
        `

    }catch(err){
        box.innerHTML = 'Failed to load repo info'
        console.error(err)
    }
}

async function fetchCommits(){
    const container = document.getElementById('log-container')

    try{
        const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?per_page=100`
        )

        const allCommits = await res.json()
console.log(allCommits);
        container.innerHTML = ''

        if(!allCommits.length){
            container.innerHTML = `
                <div class="loading">
                    No merge commits found yet
                </div>`
            return
        }

        for (let i = 0; i < allCommits.length; i++) {
            let item = allCommits[i];

            const commitDate = new Date(item.commit.author.date)

            const date = commitDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })

            const timeAgo = getTimeAgo(commitDate)

            const authorName = item.commit.author.name || 'Unknown'
            const authorAvatar = item.author?.avatar_url || ''
            const authorProfile = item.author?.html_url || '#'

            let committerName = item.commit.committer?.name || authorName
            let committerAvatar = item.committer?.avatar_url || authorAvatar
            let committerProfile = item.committer?.html_url || authorProfile

            const commitUrl = item.html_url

            container.innerHTML += `
                <div class="log-entry">

                    <div class="meta">
                        <span class="date">${date} • ${timeAgo}</span>
                        <a href="${commitUrl}" target="_blank" class="hash">
                            ${item.sha.slice(0,7)}
                        </a>
                        ${ item.parents.length >= 2 ? `<span class="merge">Merge Commit</span>` : `` }
                    </div>

                    <div class="commit-msg">
                        ${item.commit.message.split('\n')[0]}
                    </div>

                    <div class="actors">

                        ${ authorProfile === committerProfile ?
                        `<div class="actor">
                            <img src="${authorAvatar}" class="avatar">
                            <a href="${authorProfile}" target="_blank">
                                ${authorName}
                            </a>
                            <span class="role">author & committer</span>
                        </div>`
                        :
                        `<div class="actor">
                            <img src="${authorAvatar}" class="avatar">
                            <a href="${authorProfile}" target="_blank">
                                ${authorName}
                            </a>
                            <span class="role">author</span>
                        </div>
                        <div class="actor">
                            <img src="${committerAvatar}" class="avatar">
                            <a href="${committerProfile}" target="_blank">
                                ${committerName}
                            </a>
                            <span class="role">committer</span>
                        </div>`
                        }

                    </div>

                </div>
            `
        }
    }catch(err){
        container.innerHTML = `
            <div class="loading" style="color:red;">
                Failed to load commits
            </div>`
        console.error(err)
    }
}

function getTimeAgo(date){
    const seconds = Math.floor((new Date() - date) / 1000)

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ]

    for (let i of intervals){
        const count = Math.floor(seconds / i.seconds)
        if (count >= 1){
            return `${count} ${i.label}${count > 1 ? 's' : ''} ago`
        }
    }

    return 'just now'
}

fetchRepoInfo()
fetchCommits()

setInterval(() => {
    fetchRepoInfo()
    fetchCommits()
}, 90 * 1000)
