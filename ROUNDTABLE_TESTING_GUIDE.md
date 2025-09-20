# Roundtable Configuration & Personal Icebreakers - Testing Guide

## Overview
This document provides comprehensive testing instructions for the newly implemented roundtable management system and personal icebreaker features.

## 🎯 Features Implemented

### ✅ Completed Features
1. **Ice Breaker System**
   - Personal icebreaker generation using OpenAI
   - Ice breaker display on profile cards
   - Refresh functionality for new ice breakers
   - Ice breaker history tracking
   - Like system for ice breakers

2. **Roundtable Management**
   - Admin dashboard for roundtable CRUD operations
   - Roundtable creation with customizable parameters
   - Event and session integration
   - Moderator assignment
   - Ice breaker prompts configuration

3. **Database Schema**
   - Enhanced Users collection with ice breaker fields
   - New Roundtables collection
   - Proper relationships and data validation

## 🧪 Testing Instructions

### 1. Ice Breaker System Testing

#### Test 1.1: View Ice Breakers on Home Page
**URL:** `http://localhost:3030/home`

**Steps:**
1. Navigate to the home page
2. Scroll to the "Community" section
3. Look for profile cards with ice breaker sections
4. Each profile card should display:
   - User name and flag
   - Status (Recommended/New member)
   - Ice breaker question in a styled box
   - Heart button for liking profiles
   - Refresh button (🔄) for ice breakers
   - Like button (❤️) for ice breakers

**Expected Result:**
- Ice breakers should be visible on profile cards
- Default ice breaker: "What's the most exciting project you're working on right now?"
- Buttons should be interactive

#### Test 1.2: Refresh Ice Breaker
**Steps:**
1. On any profile card, click the refresh button (🔄)
2. Wait for the loading spinner to complete
3. Observe if a new ice breaker appears

**Expected Result:**
- Loading spinner should appear during refresh
- New ice breaker should be generated and displayed
- Previous ice breaker should be saved to history

#### Test 1.3: Like Ice Breaker
**Steps:**
1. Click the heart button (❤️) next to an ice breaker
2. Check browser console for success/error messages

**Expected Result:**
- No error messages in console
- Like count should increment in database

#### Test 1.4: Like Profile
**Steps:**
1. Click the heart button in the top-right corner of a profile card
2. Observe the heart fill with red color
3. Check if notification is sent to the profile owner

**Expected Result:**
- Heart should fill with red color when liked
- Profile should be added to user's liked profiles
- Notification should be created for the profile owner

### 2. Roundtable Admin Dashboard Testing

#### Test 2.1: Access Admin Dashboard
**URL:** `http://localhost:3030/admin/roundtables`

**Steps:**
1. Navigate to the roundtable admin dashboard
2. Verify the page loads without errors
3. Check if the table displays existing roundtables

**Expected Result:**
- Page should load successfully
- Table should show roundtable data with columns:
  - Name
  - Event
  - Topic
  - Participants (current/max)
  - Status
  - Actions (Edit/Delete)

#### Test 2.2: Create New Roundtable
**Steps:**
1. Click "Create Roundtable" button
2. Fill in the form with test data:
   - **Name:** "Tech Innovation Discussion"
   - **Event:** Select an existing event
   - **Session:** Select a session for the chosen event
   - **Topic:** "Future of AI in Business"
   - **Description:** "Discuss the latest trends in AI"
   - **Moderator:** Select a user from dropdown
   - **Max Participants:** 8
   - **Start Time:** Set a future date/time
   - **End Time:** Set end time after start time
   - **Status:** "Scheduled"
   - **Meeting Link:** "https://zoom.us/j/123456789"
   - **Ice Breaker Prompts:** Add 2-3 prompts
3. Click "Create Roundtable"

**Expected Result:**
- Form should submit successfully
- Modal should close
- New roundtable should appear in the table
- No error messages should appear

#### Test 2.3: Edit Roundtable
**Steps:**
1. Click "Edit" on any existing roundtable
2. Modify some fields (e.g., topic, description)
3. Click "Update Roundtable"

**Expected Result:**
- Form should populate with existing data
- Changes should be saved successfully
- Updated data should appear in the table

#### Test 2.4: Delete Roundtable
**Steps:**
1. Click "Delete" on a test roundtable
2. Confirm the deletion in the browser prompt

**Expected Result:**
- Confirmation dialog should appear
- Roundtable should be removed from the table
- No error messages should appear

### 3. Database Integration Testing

#### Test 3.1: Verify Ice Breaker Data Storage
**Steps:**
1. Open MongoDB Compass or your preferred MongoDB client
2. Connect to the database: `mongodb://localhost:27017/gen-v1-next`
3. Navigate to the `users` collection
4. Find a user document and check the `iceBreakers` field

**Expected Result:**
- `iceBreakers` field should contain:
  - `currentIceBreaker`: Current ice breaker text
  - `iceBreakerHistory`: Array of previous ice breakers
  - `iceBreakerPreferences`: User preferences for style and topics

#### Test 3.2: Verify Roundtable Data Storage
**Steps:**
1. In MongoDB Compass, navigate to the `roundtables` collection
2. Check for documents created during testing

**Expected Result:**
- Roundtable documents should contain all configured fields
- Relationships to events, sessions, and users should be properly stored
- Ice breaker prompts should be stored as an array

### 4. API Endpoints Testing

#### Test 4.1: Roundtable API
**URLs to test:**
- `GET http://localhost:3030/api/roundtables`
- `GET http://localhost:3030/api/events`
- `GET http://localhost:3030/api/sessions`
- `GET http://localhost:3030/api/users`

**Steps:**
1. Use curl or Postman to test each endpoint
2. Verify JSON responses are returned

**Expected Result:**
- All endpoints should return valid JSON
- Data should match what's in the database

#### Test 4.2: Ice Breaker Actions
**Steps:**
1. Test the ice breaker refresh functionality
2. Test the ice breaker like functionality
3. Monitor browser network tab for API calls

**Expected Result:**
- API calls should complete successfully
- No 500 errors should occur

### 5. Error Handling Testing

#### Test 5.1: Invalid Data Submission
**Steps:**
1. Try to create a roundtable with missing required fields
2. Try to set end time before start time
3. Try to submit empty ice breaker prompts

**Expected Result:**
- Appropriate error messages should be displayed
- Form should not submit with invalid data

#### Test 5.2: Network Error Simulation
**Steps:**
1. Disconnect internet temporarily
2. Try to refresh an ice breaker
3. Reconnect and try again

**Expected Result:**
- Error handling should gracefully manage network issues
- Functionality should resume after reconnection

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: Ice Breakers Not Showing
**Solution:**
1. Check if OpenAI API key is configured in `.env`
2. Verify user has bio/profession data
3. Check browser console for errors

#### Issue: Admin Dashboard Not Loading
**Solution:**
1. Ensure all API routes are accessible
2. Check if user has admin permissions
3. Verify database connection

#### Issue: Roundtable Creation Fails
**Solution:**
1. Ensure events and sessions exist in database
2. Check date/time validation
3. Verify all required fields are filled

#### Issue: Ice Breaker Refresh Not Working
**Solution:**
1. Check OpenAI API key and quota
2. Verify user profile has sufficient data
3. Check server logs for errors

## 📊 Performance Testing

### Load Testing
1. Create multiple roundtables simultaneously
2. Refresh ice breakers for multiple users
3. Monitor server performance and response times

### Data Volume Testing
1. Create users with extensive ice breaker history
2. Test with large numbers of roundtables
3. Verify pagination and performance

## 🎉 Success Criteria

### Ice Breaker System
- ✅ Ice breakers display on profile cards
- ✅ Refresh functionality works
- ✅ Like system functions properly
- ✅ History tracking works
- ✅ OpenAI integration functions

### Roundtable Management
- ✅ Admin dashboard loads and functions
- ✅ CRUD operations work correctly
- ✅ Data validation prevents invalid submissions
- ✅ Relationships with events/sessions work
- ✅ Ice breaker prompts can be configured

### Integration
- ✅ Database schema supports all features
- ✅ API endpoints return correct data
- ✅ Error handling is robust
- ✅ Performance is acceptable

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________

Ice Breaker System:
- [ ] Profile cards show ice breakers
- [ ] Refresh functionality works
- [ ] Like system functions
- [ ] History tracking works

Roundtable Admin:
- [ ] Dashboard loads correctly
- [ ] Create roundtable works
- [ ] Edit roundtable works
- [ ] Delete roundtable works
- [ ] Data validation works

API Endpoints:
- [ ] All endpoints return valid data
- [ ] Error handling works
- [ ] Performance is acceptable

Issues Found:
1. ________________
2. ________________
3. ________________

Overall Status: [ ] PASS [ ] FAIL
```

## 🚀 Next Steps

After successful testing, the following features can be implemented:
1. Roundtable assignment algorithm
2. Roundtable analytics dashboard
3. Advanced scheduling features
4. Email notifications for roundtable invites
5. Mobile app integration

---

**Note:** This testing guide covers the current implementation. As new features are added, this document should be updated accordingly.
