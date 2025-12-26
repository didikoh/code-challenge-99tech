# Problem 6: Live Scoreboard API Architecture

## Overview

This document provides a comprehensive architectural specification for a Live Scoreboard API that displays the top 10 users' scores with real-time updates and secure score submission.

---

## System Requirements

1. **Display Top 10 Scoreboard** - Website shows the top 10 users with highest scores
2. **Live Updates** - Real-time scoreboard updates without page refresh
3. **Score Updates via API** - Users can complete actions that trigger score updates
4. **Authorization & Security** - Prevent malicious score manipulation

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐              ┌─────────────────┐           │
│  │   Web Browser   │              │  Mobile App     │           │
│  │                 │              │                 │           │
│  │  ┌───────────┐  │              │  ┌───────────┐  │           │
│  │  │Scoreboard │  │              │  │Scoreboard │  │           │
│  │  │Component  │  │              │  │View       │  │           │
│  │  └─────┬─────┘  │              │  └─────┬─────┘  │           │
│  │        │        │              │        │        │           │
│  │  ┌─────▼──────┐ │              │  ┌─────▼──────┐ │           │
│  │  │ WebSocket  │ │              │  │ WebSocket  │ │           │
│  │  │ Connection │ │              │  │ Connection │ │           │
│  │  └─────┬──────┘ │              │  └─────┬──────┘ │           │
│  └────────┼────────┘              └────────┼────────┘           │
│           │                                 │                    │
└───────────┼─────────────────────────────────┼────────────────────┘
            │                                 │
            │         REST + WebSocket        │
            │                                 │
┌───────────▼─────────────────────────────────▼────────────────────┐
│                      API GATEWAY LAYER                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │             Load Balancer / API Gateway                   │   │
│  │  - Rate Limiting                                          │   │
│  │  - SSL/TLS Termination                                    │   │
│  │  - Request Routing                                        │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
└───────────────────────┼───────────────────────────────────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
┌───────────▼──────┐   ┌────────────▼──────────┐
│  Authentication  │   │  Application Server   │
│     Service      │   │       (Node.js)       │
│                  │   │                       │
│  ┌────────────┐  │   │  ┌─────────────────┐  │
│  │   JWT      │  │   │  │  Score Update   │  │
│  │  Validator │  │   │  │    Handler      │  │
│  └────────────┘  │   │  └────────┬────────┘  │
│                  │   │           │            │
│  ┌────────────┐  │   │  ┌────────▼────────┐  │
│  │  Session   │  │   │  │  Scoreboard     │  │
│  │  Manager   │  │   │  │    Service      │  │
│  └────────────┘  │   │  └────────┬────────┘  │
└──────────────────┘   │           │            │
                       │  ┌────────▼────────┐  │
                       │  │   WebSocket     │  │
                       │  │    Manager      │  │
                       │  └────────┬────────┘  │
                       └───────────┼───────────┘
                                   │
┌──────────────────────────────────┼───────────────────────────────┐
│                        DATA LAYER │                               │
├──────────────────────────────────▼───────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  PostgreSQL DB   │         │   Redis Cache    │              │
│  │                  │         │                  │              │
│  │ ┌──────────────┐ │         │ ┌──────────────┐ │              │
│  │ │Users Table   │ │         │ │Top 10        │ │              │
│  │ │- id          │ │         │ │Scoreboard    │ │              │
│  │ │- username    │ │         │ │Cache         │ │              │
│  │ │- score       │ │         │ │(TTL: 5s)     │ │              │
│  │ │- lastUpdate  │ │         │ └──────────────┘ │              │
│  │ └──────────────┘ │         │                  │              │
│  │                  │         │ ┌──────────────┐ │              │
│  │ ┌──────────────┐ │         │ │Session Store │ │              │
│  │ │Actions Log   │ │         │ │              │ │              │
│  │ │- userId      │ │         │ └──────────────┘ │              │
│  │ │- actionType  │ │         │                  │              │
│  │ │- points      │ │         │ ┌──────────────┐ │              │
│  │ │- timestamp   │ │         │ │Rate Limit    │ │              │
│  │ │- ipAddress   │ │         │ │Counter       │ │              │
│  │ └──────────────┘ │         │ └──────────────┘ │              │
│  └──────────────────┘         └──────────────────┘              │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints Specification

### 1. **Score Update API**

**Endpoint:** `POST /api/v1/scores/update`

**Purpose:** Update user score after completing an action

**Authentication:** Required (JWT Bearer Token)

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-Request-ID: <unique_request_id>
```

**Request Body:**
```json
{
  "actionId": "ACTION_COMPLETE_LEVEL_1",
  "actionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "metadata": {
    "level": 1,
    "duration": 45.2,
    "accuracy": 95
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "previousScore": 1000,
    "pointsAwarded": 50,
    "newScore": 1050,
    "newRank": 7,
    "timestamp": "2025-12-26T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ACTION_TOKEN",
    "message": "Action token is invalid or expired"
  }
}
```

### 2. **Get Scoreboard API**

**Endpoint:** `GET /api/v1/scoreboard/top`

**Purpose:** Retrieve top 10 users

**Authentication:** Optional (public endpoint)

**Query Parameters:**
- `limit` (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "scoreboard": [
      {
        "rank": 1,
        "userId": "user456",
        "username": "ProGamer123",
        "score": 9850,
        "avatar": "https://cdn.example.com/avatars/user456.jpg",
        "lastUpdate": "2025-12-26T10:25:00.000Z"
      },
      // ... 9 more entries
    ],
    "lastUpdated": "2025-12-26T10:30:00.000Z",
    "nextUpdate": "2025-12-26T10:30:05.000Z"
  }
}
```

### 3. **WebSocket Connection**

**Endpoint:** `wss://api.example.com/ws/scoreboard`

**Purpose:** Real-time scoreboard updates

**Authentication:** Optional (can be anonymous or authenticated)

**Connection:**
```javascript
const ws = new WebSocket('wss://api.example.com/ws/scoreboard');
```

**Server-to-Client Messages:**
```json
{
  "type": "SCOREBOARD_UPDATE",
  "data": {
    "rank": 1,
    "userId": "user456",
    "username": "ProGamer123",
    "score": 9850,
    "change": "+50"
  },
  "timestamp": "2025-12-26T10:30:00.000Z"
}
```

---

## Security Implementation

### 1. **Action Token System**

**Problem:** Prevent users from calling the score API directly without completing actions.

**Solution:** Use short-lived, single-use action tokens.

#### Flow:
1. **User completes action** → Frontend sends action completion to game server
2. **Game server validates** → Checks if action was legitimately completed
3. **Generate action token** → Creates JWT with:
   ```json
   {
     "userId": "user123",
     "actionId": "ACTION_COMPLETE_LEVEL_1",
     "points": 50,
     "nonce": "unique_random_string",
     "exp": 1672056600  // 30 seconds expiry
   }
   ```
4. **Sign token** → Uses server-side secret key
5. **Return to frontend** → Frontend immediately sends to score API
6. **Score API validates** → Checks signature, expiry, and nonce (prevents replay)
7. **Update score** → If valid, updates database

#### Token Validation:
```typescript
// Pseudocode
async function validateActionToken(token: string): Promise<boolean> {
  // Verify JWT signature
  const decoded = jwt.verify(token, SECRET_KEY);
  
  // Check expiration (max 30 seconds old)
  if (decoded.exp < Date.now() / 1000) {
    throw new Error('Token expired');
  }
  
  // Check if nonce was already used (Redis)
  const nonceUsed = await redis.get(`nonce:${decoded.nonce}`);
  if (nonceUsed) {
    throw new Error('Token already used');
  }
  
  // Mark nonce as used (expire after 1 hour)
  await redis.setex(`nonce:${decoded.nonce}`, 3600, '1');
  
  return true;
}
```

### 2. **Rate Limiting**

Prevent spam and DDoS attacks:

- **Per User:** Max 10 score updates per minute
- **Per IP:** Max 100 requests per minute
- **Global:** Max 10,000 concurrent WebSocket connections

Implementation using Redis:
```typescript
async function checkRateLimit(userId: string): Promise<boolean> {
  const key = `rate_limit:${userId}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, 60); // 1 minute window
  }
  
  return count <= 10;
}
```

### 3. **Request Authentication**

- **JWT Authentication:** All score update requests require valid JWT
- **Session Management:** Sessions expire after 24 hours of inactivity
- **IP Tracking:** Log IP addresses for fraud detection
- **Device Fingerprinting:** Detect multiple accounts from same device

### 4. **Database-Level Security**

- **Parameterized Queries:** Prevent SQL injection
- **Read Replicas:** Separate read/write to prevent read load from affecting writes
- **Transaction Locking:** Prevent race conditions on score updates
- **Audit Trail:** Log all score changes with timestamp and reason

---

## Data Flow

### Score Update Flow:

```
1. User completes action in game
   ↓
2. Frontend validates action locally
   ↓
3. Request action token from game server
   POST /api/v1/actions/validate
   ↓
4. Game server validates action completion
   - Check game state
   - Verify action is legitimate
   - Generate action token (JWT)
   ↓
5. Frontend receives action token
   ↓
6. Frontend calls score update API
   POST /api/v1/scores/update
   Headers: Authorization: Bearer <jwt>
   Body: { actionToken, actionId, metadata }
   ↓
7. API validates request
   - Verify JWT authentication
   - Validate action token
   - Check rate limits
   - Verify nonce not used
   ↓
8. Update database
   BEGIN TRANSACTION
   - Get current score (with row lock)
   - Calculate new score
   - Update user score
   - Insert action log
   - Check if user enters top 10
   COMMIT TRANSACTION
   ↓
9. Update Redis cache
   - Invalidate/update top 10 cache
   - Set TTL for 5 seconds
   ↓
10. Broadcast via WebSocket
    - If user in top 10, notify all connected clients
    ↓
11. Return response to client
    { success: true, newScore, newRank }
```

### Scoreboard Display Flow:

```
1. User opens scoreboard page
   ↓
2. Establish WebSocket connection
   wss://api.example.com/ws/scoreboard
   ↓
3. Fetch initial top 10
   GET /api/v1/scoreboard/top
   ↓
4. Check Redis cache
   ├─ Cache HIT: Return cached data
   └─ Cache MISS:
      - Query database for top 10
      - Store in Redis (TTL: 5s)
      - Return data
   ↓
5. Display scoreboard in UI
   ↓
6. Listen for WebSocket updates
   - Receive real-time score changes
   - Update UI with smooth animations
   ↓
7. On disconnect/error
   - Attempt reconnection (exponential backoff)
   - Fall back to polling every 5 seconds
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  score BIGINT DEFAULT 0,
  rank INT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_action_at TIMESTAMP,
  INDEX idx_score (score DESC),
  INDEX idx_rank (rank ASC)
);
```

### Actions Log Table
```sql
CREATE TABLE actions_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action_id VARCHAR(100) NOT NULL,
  points_awarded INT NOT NULL,
  action_token_hash VARCHAR(256),
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_created (user_id, created_at DESC),
  INDEX idx_created_at (created_at DESC)
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token_hash VARCHAR(256) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_id (user_id),
  INDEX idx_expires (expires_at)
);
```

---

## Redis Cache Structure

### Top 10 Scoreboard Cache
```
Key: "scoreboard:top10"
Type: Sorted Set
TTL: 5 seconds

ZADD scoreboard:top10 9850 "user456"
ZADD scoreboard:top10 9200 "user789"
...
```

### User Score Cache
```
Key: "user:<userId>:score"
Type: String
TTL: 60 seconds

SET user:user123:score 1050 EX 60
```

### Rate Limit Counter
```
Key: "rate_limit:<userId>"
Type: Integer
TTL: 60 seconds

INCR rate_limit:user123
EXPIRE rate_limit:user123 60
```

### Action Token Nonce
```
Key: "nonce:<nonce_value>"
Type: String
TTL: 3600 seconds

SET nonce:abc123xyz 1 EX 3600
```

---

## Technology Stack Recommendations

### Backend
- **Framework:** Node.js with Express or NestJS
- **WebSocket:** Socket.io or native WebSocket (ws library)
- **Database:** PostgreSQL (primary), Redis (cache)
- **Authentication:** JWT with RS256 algorithm
- **Rate Limiting:** express-rate-limit + Redis

### Frontend
- **Framework:** React, Vue, or Angular
- **WebSocket Client:** Socket.io-client or native WebSocket
- **State Management:** Redux, Zustand, or Context API
- **HTTP Client:** Axios or Fetch API

### Infrastructure
- **Load Balancer:** Nginx or AWS ALB
- **Caching:** Redis Cluster
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)

---

## Performance Optimizations

### 1. **Caching Strategy**
- Cache top 10 scoreboard in Redis (5-second TTL)
- Cache individual user scores (60-second TTL)
- Use cache-aside pattern for database queries

### 2. **Database Optimization**
- Index on `score DESC` for fast top-N queries
- Use materialized views for complex aggregations
- Partition actions_log table by date
- Use connection pooling (min: 10, max: 50)

### 3. **WebSocket Optimization**
- Use WebSocket clusters with Redis Pub/Sub
- Implement heartbeat/ping-pong for connection health
- Batch updates if multiple score changes occur simultaneously
- Compress large payloads with gzip

### 4. **Query Optimization**
```sql
-- Efficient top 10 query with caching hint
SELECT id, username, score, avatar_url, last_action_at
FROM users
WHERE score > 0
ORDER BY score DESC, updated_at DESC
LIMIT 10;
```

---

## Monitoring & Alerts

### Key Metrics
1. **Score Update Latency:** p50, p95, p99 response times
2. **WebSocket Connection Count:** Active connections
3. **Rate Limit Violations:** Failed requests due to rate limiting
4. **Invalid Token Attempts:** Potential security issues
5. **Database Query Time:** Slow query detection
6. **Cache Hit Rate:** Redis cache effectiveness

### Alert Thresholds
- Score update p99 latency > 500ms
- WebSocket connections > 8,000 (80% capacity)
- Invalid token attempts > 100/min from single IP
- Database connection pool > 80% utilization
- Cache hit rate < 90%

---

## Potential Improvements

### 1. **Anti-Cheat System**
- Implement machine learning to detect abnormal score patterns
- Analyze user behavior (time between actions, score velocity)
- Flag suspicious accounts for manual review
- Use CAPTCHA for high-score updates

### 2. **Leaderboard Tiers**
- Implement multiple leaderboards (daily, weekly, all-time)
- Add regional/country-based leaderboards
- Create friend-only leaderboards

### 3. **Scalability Enhancements**
- Implement horizontal scaling with Kubernetes
- Use message queues (RabbitMQ/Kafka) for score updates
- Separate read and write databases (CQRS pattern)
- Use CDN for static scoreboard snapshots

### 4. **User Experience**
- Add smooth animations for rank changes
- Show historical score progression charts
- Implement achievement badges/milestones
- Add social features (follow users, challenges)

### 5. **Advanced Security**
- Implement device fingerprinting
- Use blockchain for audit trail immutability
- Add two-factor authentication for high-value actions
- Implement IP reputation system

### 6. **Analytics**
- Track user engagement metrics
- Analyze peak usage times for capacity planning
- Monitor action completion rates
- A/B test different scoring algorithms

---

## Deployment Considerations

### 1. **Environment Setup**
- **Development:** Local PostgreSQL + Redis
- **Staging:** Cloud-hosted, scaled down (1 server)
- **Production:** Multi-region, auto-scaling (5+ servers)

### 2. **CI/CD Pipeline**
```
Code Push → GitHub
   ↓
Automated Tests (Jest, E2E)
   ↓
Build Docker Image
   ↓
Push to Registry (Docker Hub/ECR)
   ↓
Deploy to Staging
   ↓
Integration Tests
   ↓
Manual Approval
   ↓
Deploy to Production (Blue-Green)
   ↓
Monitor & Rollback if needed
```

### 3. **Disaster Recovery**
- Database backups every 6 hours
- Point-in-time recovery (PITR) enabled
- Multi-AZ deployment for high availability
- Automated failover with health checks

---

## Conclusion

This architecture provides a scalable, secure, and performant solution for a live scoreboard system. The key security features (action tokens, rate limiting, nonce validation) effectively prevent score manipulation while maintaining good user experience through real-time WebSocket updates and aggressive caching.

The modular design allows for easy scaling and future enhancements such as advanced anti-cheat systems, multiple leaderboard tiers, and improved analytics.
