# Database Schema

## Firestore Collections

### `families`
| Field | Type | Description |
|-------|------|-------------|
| familyName | string | Family surname |
| houseName | string | House/home name |
| ward | string | Parish ward number/name |
| address | string | Full address |
| phone | string | Primary phone number |
| email | string | Family email |
| parishUnit | string | Parish unit name |
| photoUrl | string | Family photo URL |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `members`
| Field | Type | Description |
|-------|------|-------------|
| familyId | string | Reference to family document ID |
| name | string | Full name |
| gender | string | Male/Female |
| relationship | string | Head, Wife, Son, Daughter, etc. |
| dateOfBirth | string | Date of birth (YYYY-MM-DD) |
| baptismDate | string | Baptism date |
| marriageDate | string | Marriage date (if applicable) |
| occupation | string | Current occupation |
| bloodGroup | string | A+, A-, B+, B-, AB+, AB-, O+, O- |
| mobile | string | Mobile number |
| email | string | Personal email |
| photoUrl | string | Member photo URL |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `priests`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Full name with title |
| designation | string | Parish Priest, Asst. Priest, etc. |
| status | string | "current" or "former" |
| period | string | Service period (e.g., "2020 - Present") |
| photoUrl | string | Photo URL |
| order | number | Display order |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `announcements`
| Field | Type | Description |
|-------|------|-------------|
| title | string | Announcement title |
| description | string | Full text content |
| category | string | Notice, Circular, Important, General |
| attachmentUrl | string | Optional attachment link |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `events`
| Field | Type | Description |
|-------|------|-------------|
| title | string | Event title |
| description | string | Event details |
| date | string | Event date (YYYY-MM-DD) |
| time | string | Event time |
| venue | string | Event venue |
| posterUrl | string | Event poster image URL |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `gallery`
| Field | Type | Description |
|-------|------|-------------|
| url | string | Image URL |
| caption | string | Image caption |
| category | string | Church, Feast, Retreat, Youth, etc. |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `ministries`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Ministry/organization name |
| description | string | Description of the ministry |
| icon | string | Emoji icon |
| president | string | Current president name |
| order | number | Display order |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `massTimings`
| Field | Type | Description |
|-------|------|-------------|
| category | string | Weekdays, Saturday, Sunday, Feast Days |
| icon | string | Emoji icon |
| items | array | Array of timing strings |
| order | number | Display order |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `downloads`
| Field | Type | Description |
|-------|------|-------------|
| title | string | Document title |
| description | string | Brief description |
| category | string | General, Bulletin, Circular, Report, Form |
| url | string | Download URL |
| fileName | string | Original file name |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### `contactMessages`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Sender's name |
| email | string | Sender's email |
| phone | string | Sender's phone (optional) |
| subject | string | Message subject |
| message | string | Message content |
| createdAt | string | ISO timestamp |

### `users`
| Field | Type | Description |
|-------|------|-------------|
| role | string | "admin" or "member" |
| email | string | User's email |
| name | string | User's display name |

## Firebase Storage Structure

```
storage/
├── gallery/           # Gallery images
│   └── {timestamp}_{filename}
├── downloads/         # Downloadable documents (PDFs, etc.)
│   └── {timestamp}_{filename}
└── families/          # Family photos
    └── {familyId}/{filename}
```
