import React from 'react'
import './index.css'

export default class FamilyFeedback extends React.Component {
    constructor(props) {
        super(props)

        // Initialize state with enhanced fields
        this.state = {
            formData: {
                childName: '',
                parentName: '',
                feedbackDate: '',
                gradeLevel: '',

                // Practice details
                atHomePractice: '',
                practiceFrequency: '',
                practiceMinutesPerDay: '',

                // Skill ratings (1-5 scale)
                ratingFocus: '3',
                ratingFollowingDirections: '3',
                ratingTurnTaking: '3',
                ratingEmotionalRegulation: '3',
                ratingSocialInteraction: '3',

                // Multiple choice challenges (checkboxes)
                challengeAttention: false,
                challengeBehavior: false,
                challengeSocial: false,
                challengeAcademic: false,
                challengeMotivation: false,

                // Open-ended fields
                challenges: '',
                successes: '',
                improvementAreas: '',
                additionalComments: '',

                // Support needs
                needsSupport: '',
                supportType: '',
                preferredContactMethod: ''
            },
            feedbackList: []
        }

        // Bind methods
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Lifecycle method: Load feedback from localStorage when component mounts
    componentDidMount() {
        try {
            const saved = localStorage.getItem('familyFeedback')
            if (saved) {
                this.setState({ feedbackList: JSON.parse(saved) })
            }
        } catch (error) {
            console.error('Error loading feedback:', error)
        }
    }

    // Lifecycle method: Save feedback to localStorage whenever it changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.feedbackList !== this.state.feedbackList) {
            try {
                localStorage.setItem('familyFeedback', JSON.stringify(this.state.feedbackList))
            } catch (error) {
                console.error('Error saving feedback:', error)
            }
        }
    }

    // Handle input changes (text, radio, select, and checkbox)
    handleChange(e) {
        const { name, value, type, checked } = e.target
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: type === 'checkbox' ? checked : value
            }
        }))
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault()

        // Add timestamp to feedback
        const newFeedback = {
            ...this.state.formData,
            date: new Date().toLocaleString()
        }

        // Add to feedback list
        this.setState(prevState => ({
            feedbackList: [...prevState.feedbackList, newFeedback],
            formData: {
                childName: '',
                parentName: '',
                feedbackDate: '',
                gradeLevel: '',
                atHomePractice: '',
                practiceFrequency: '',
                practiceMinutesPerDay: '',
                ratingFocus: '3',
                ratingFollowingDirections: '3',
                ratingTurnTaking: '3',
                ratingEmotionalRegulation: '3',
                ratingSocialInteraction: '3',
                challengeAttention: false,
                challengeBehavior: false,
                challengeSocial: false,
                challengeAcademic: false,
                challengeMotivation: false,
                challenges: '',
                successes: '',
                improvementAreas: '',
                additionalComments: '',
                needsSupport: '',
                supportType: '',
                preferredContactMethod: ''
            }
        }))

        alert('Feedback submitted successfully!')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    render() {
        const { formData, feedbackList } = this.state

        const inputStyle = {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            outline: 'none',
            fontFamily: 'inherit'
        }

        return (
            <div className="container">
                <div className="header">
                    <h1 className="title">Family Feedback</h1>
                    <div className="subtitle">Comprehensive feedback on your child's classroom behavior and progress</div>
                </div>

                <div className="home">
                    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <form onSubmit={this.handleSubmit}>

                            {/* Section 1: Basic Information */}
                            <h3 style={{ marginBottom: '16px', color: '#1e40af', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
                                📋 Basic Information
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Child Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="childName"
                                        value={formData.childName}
                                        onChange={this.handleChange}
                                        required
                                        placeholder="Enter child's name"
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Parent/Guardian Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={this.handleChange}
                                        required
                                        placeholder="Enter your name"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Feedback Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="feedbackDate"
                                        value={formData.feedbackDate}
                                        onChange={this.handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Grade Level *
                                    </label>
                                    <select
                                        name="gradeLevel"
                                        value={formData.gradeLevel}
                                        onChange={this.handleChange}
                                        required
                                        style={inputStyle}
                                    >
                                        <option value="">Select grade</option>
                                        <option value="Pre-K">Pre-K</option>
                                        <option value="Kindergarten">Kindergarten</option>
                                        <option value="1st Grade">1st Grade</option>
                                        <option value="2nd Grade">2nd Grade</option>
                                        <option value="3rd Grade">3rd Grade</option>
                                        <option value="4th Grade">4th Grade</option>
                                        <option value="5th Grade">5th Grade</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section 2: At-Home Practice */}
                            <h3 style={{ marginBottom: '16px', color: '#059669', borderBottom: '2px solid #10b981', paddingBottom: '8px' }}>
                                🏠 At-Home Practice
                            </h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Practice Activities Description
                                </label>
                                <textarea
                                    name="atHomePractice"
                                    value={formData.atHomePractice}
                                    onChange={this.handleChange}
                                    placeholder="Describe what classroom skills were practiced at home..."
                                    rows="3"
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Practice Frequency
                                    </label>
                                    <select
                                        name="practiceFrequency"
                                        value={formData.practiceFrequency}
                                        onChange={this.handleChange}
                                        style={inputStyle}
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="Daily">Daily</option>
                                        <option value="3-4 times per week">3-4 times per week</option>
                                        <option value="1-2 times per week">1-2 times per week</option>
                                        <option value="Occasionally">Occasionally</option>
                                        <option value="Not practiced">Not practiced</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Average Minutes Per Day
                                    </label>
                                    <input
                                        type="number"
                                        name="practiceMinutesPerDay"
                                        value={formData.practiceMinutesPerDay}
                                        onChange={this.handleChange}
                                        min="0"
                                        max="180"
                                        placeholder="e.g., 15"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Skill Ratings */}
                            <h3 style={{ marginBottom: '16px', color: '#7c3aed', borderBottom: '2px solid #a78bfa', paddingBottom: '8px' }}>
                                ⭐ Skill Progress Ratings
                            </h3>
                            <p style={{ marginBottom: '16px', fontSize: '14px', color: '#64748b' }}>
                                Rate each skill on a scale of 1-5 (1 = Needs significant improvement, 3 = Average, 5 = Excellent)
                            </p>

                            <div style={{ marginBottom: '24px' }}>
                                {[
                                    { name: 'ratingFocus', label: 'Focus & Attention' },
                                    { name: 'ratingFollowingDirections', label: 'Following Directions' },
                                    { name: 'ratingTurnTaking', label: 'Turn-Taking & Sharing' },
                                    { name: 'ratingEmotionalRegulation', label: 'Emotional Regulation' },
                                    { name: 'ratingSocialInteraction', label: 'Social Interaction with Peers' }
                                ].map((rating, idx) => (
                                    <div key={idx} style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                        <label className="label" style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                                            {rating.label}
                                        </label>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '14px', color: '#64748b', minWidth: '120px' }}>Needs Improvement</span>
                                            {[1, 2, 3, 4, 5].map(val => (
                                                <label key={val} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name={rating.name}
                                                        value={val.toString()}
                                                        checked={formData[rating.name] === val.toString()}
                                                        onChange={this.handleChange}
                                                        style={{ marginRight: '4px', cursor: 'pointer' }}
                                                    />
                                                    {val}
                                                </label>
                                            ))}
                                            <span style={{ fontSize: '14px', color: '#64748b', minWidth: '80px', textAlign: 'right' }}>Excellent</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Section 4: Challenge Areas (Checkboxes) */}
                            <h3 style={{ marginBottom: '16px', color: '#dc2626', borderBottom: '2px solid #ef4444', paddingBottom: '8px' }}>
                                ⚠️ Challenge Areas Observed
                            </h3>
                            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>
                                Select all that apply:
                            </p>

                            <div style={{ marginBottom: '16px', padding: '16px', background: '#fef2f2', borderRadius: '8px' }}>
                                {[
                                    { name: 'challengeAttention', label: 'Attention & Focus Difficulties' },
                                    { name: 'challengeBehavior', label: 'Behavioral Issues (e.g., not following rules)' },
                                    { name: 'challengeSocial', label: 'Social Interaction Challenges' },
                                    { name: 'challengeAcademic', label: 'Academic Task Completion' },
                                    { name: 'challengeMotivation', label: 'Motivation & Engagement' }
                                ].map((challenge, idx) => (
                                    <label key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name={challenge.name}
                                            checked={formData[challenge.name]}
                                            onChange={this.handleChange}
                                            style={{ marginRight: '8px', cursor: 'pointer', width: '18px', height: '18px' }}
                                        />
                                        <span style={{ fontSize: '16px' }}>{challenge.label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Section 5: Descriptive Feedback */}
                            <h3 style={{ marginBottom: '16px', color: '#ea580c', borderBottom: '2px solid #f97316', paddingBottom: '8px' }}>
                                📝 Detailed Observations
                            </h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Specific Challenges
                                </label>
                                <textarea
                                    name="challenges"
                                    value={formData.challenges}
                                    onChange={this.handleChange}
                                    placeholder="Describe any specific challenges or difficulties you've observed..."
                                    rows="3"
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Successes & Achievements
                                </label>
                                <textarea
                                    name="successes"
                                    value={formData.successes}
                                    onChange={this.handleChange}
                                    placeholder="What improvements or successes have you noticed?..."
                                    rows="3"
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Areas for Improvement
                                </label>
                                <textarea
                                    name="improvementAreas"
                                    value={formData.improvementAreas}
                                    onChange={this.handleChange}
                                    placeholder="What areas should we focus on for improvement?..."
                                    rows="3"
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Additional Comments
                                </label>
                                <textarea
                                    name="additionalComments"
                                    value={formData.additionalComments}
                                    onChange={this.handleChange}
                                    placeholder="Any other observations or comments you'd like to share..."
                                    rows="3"
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            {/* Section 6: Support Needs */}
                            <h3 style={{ marginBottom: '16px', color: '#0891b2', borderBottom: '2px solid #06b6d4', paddingBottom: '8px' }}>
                                🤝 Support & Follow-up
                            </h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Does your child need additional support? *
                                </label>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="needsSupport"
                                            value="yes"
                                            checked={formData.needsSupport === 'yes'}
                                            onChange={this.handleChange}
                                            required
                                            style={{ marginRight: '8px', cursor: 'pointer' }}
                                        />
                                        Yes
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="needsSupport"
                                            value="no"
                                            checked={formData.needsSupport === 'no'}
                                            onChange={this.handleChange}
                                            required
                                            style={{ marginRight: '8px', cursor: 'pointer' }}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>

                            {formData.needsSupport === 'yes' && (
                                <div style={{ marginBottom: '16px', padding: '16px', background: '#f0f9ff', borderRadius: '8px' }}>
                                    <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                        Type of Support Needed
                                    </label>
                                    <select
                                        name="supportType"
                                        value={formData.supportType}
                                        onChange={this.handleChange}
                                        style={inputStyle}
                                    >
                                        <option value="">Select type</option>
                                        <option value="Teacher Meeting">Teacher Meeting</option>
                                        <option value="Counselor Referral">Counselor Referral</option>
                                        <option value="Additional Resources">Additional Practice Resources</option>
                                        <option value="Behavior Plan">Behavior Intervention Plan</option>
                                        <option value="Academic Support">Academic Support</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ marginBottom: '24px' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    Preferred Contact Method
                                </label>
                                <select
                                    name="preferredContactMethod"
                                    value={formData.preferredContactMethod}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                >
                                    <option value="">Select method</option>
                                    <option value="Email">Email</option>
                                    <option value="Phone Call">Phone Call</option>
                                    <option value="In-Person Meeting">In-Person Meeting</option>
                                    <option value="Written Note">Written Note</option>
                                </select>
                            </div>

                            <button type="submit" className="btn" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>
                                Submit Comprehensive Feedback
                            </button>
                        </form>
                    </div>

                    {/* Previous Feedback Display */}
                    {feedbackList.length > 0 && (
                        <div style={{ marginTop: '32px', maxWidth: '800px', margin: '32px auto 0' }}>
                            <h2 className="title" style={{ fontSize: '24px', marginBottom: '16px' }}>
                                📚 Previous Feedback Submissions
                            </h2>
                            {feedbackList.map((feedback, index) => (
                                <div key={index} className="card" style={{ marginBottom: '16px' }}>
                                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div>
                                            <div className="title" style={{ fontSize: '18px', marginBottom: '4px' }}>
                                                {feedback.childName} - {feedback.gradeLevel}
                                            </div>
                                            <div className="subtitle" style={{ fontSize: '12px' }}>
                                                Submitted by: {feedback.parentName} | {feedback.date}
                                            </div>
                                        </div>
                                        <div className="chip" style={{ background: feedback.needsSupport === 'yes' ? '#fef2f2' : '#f0fdf4', color: feedback.needsSupport === 'yes' ? '#dc2626' : '#059669', border: feedback.needsSupport === 'yes' ? '2px solid #fecaca' : '2px solid #bbf7d0' }}>
                                            {feedback.needsSupport === 'yes' ? '⚠️ Needs Support' : '✅ On Track'}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', fontSize: '14px' }}>
                                        {feedback.practiceFrequency && (
                                            <div><strong>Practice:</strong> {feedback.practiceFrequency}</div>
                                        )}
                                        {feedback.practiceMinutesPerDay && (
                                            <div><strong>Duration:</strong> {feedback.practiceMinutesPerDay} min/day</div>
                                        )}
                                    </div>

                                    {/* Skill Ratings Display */}
                                    {(feedback.ratingFocus || feedback.ratingFollowingDirections) && (
                                        <div style={{ marginBottom: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                            <strong style={{ display: 'block', marginBottom: '8px' }}>Skill Ratings:</strong>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '13px' }}>
                                                {feedback.ratingFocus && <div>Focus: {'⭐'.repeat(parseInt(feedback.ratingFocus))} ({feedback.ratingFocus}/5)</div>}
                                                {feedback.ratingFollowingDirections && <div>Directions: {'⭐'.repeat(parseInt(feedback.ratingFollowingDirections))} ({feedback.ratingFollowingDirections}/5)</div>}
                                                {feedback.ratingTurnTaking && <div>Turn-Taking: {'⭐'.repeat(parseInt(feedback.ratingTurnTaking))} ({feedback.ratingTurnTaking}/5)</div>}
                                                {feedback.ratingEmotionalRegulation && <div>Emotional Reg.: {'⭐'.repeat(parseInt(feedback.ratingEmotionalRegulation))} ({feedback.ratingEmotionalRegulation}/5)</div>}
                                                {feedback.ratingSocialInteraction && <div>Social: {'⭐'.repeat(parseInt(feedback.ratingSocialInteraction))} ({feedback.ratingSocialInteraction}/5)</div>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Challenge Areas */}
                                    {(feedback.challengeAttention || feedback.challengeBehavior || feedback.challengeSocial || feedback.challengeAcademic || feedback.challengeMotivation) && (
                                        <div style={{ marginBottom: '12px' }}>
                                            <strong>Challenge Areas:</strong>
                                            <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {feedback.challengeAttention && <span className="chip" style={{ fontSize: '12px' }}>Attention</span>}
                                                {feedback.challengeBehavior && <span className="chip" style={{ fontSize: '12px' }}>Behavior</span>}
                                                {feedback.challengeSocial && <span className="chip" style={{ fontSize: '12px' }}>Social</span>}
                                                {feedback.challengeAcademic && <span className="chip" style={{ fontSize: '12px' }}>Academic</span>}
                                                {feedback.challengeMotivation && <span className="chip" style={{ fontSize: '12px' }}>Motivation</span>}
                                            </div>
                                        </div>
                                    )}

                                    {feedback.challenges && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Challenges:</strong> {feedback.challenges}
                                        </div>
                                    )}
                                    {feedback.successes && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Successes:</strong> {feedback.successes}
                                        </div>
                                    )}
                                    {feedback.improvementAreas && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Improvement Areas:</strong> {feedback.improvementAreas}
                                        </div>
                                    )}
                                    {feedback.additionalComments && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Additional Comments:</strong> {feedback.additionalComments}
                                        </div>
                                    )}
                                    {feedback.supportType && (
                                        <div style={{ marginTop: '12px', padding: '8px', background: '#eff6ff', borderRadius: '4px', borderLeft: '4px solid #3b82f6' }}>
                                            <strong>Support Requested:</strong> {feedback.supportType}
                                            {feedback.preferredContactMethod && ` (Contact via: ${feedback.preferredContactMethod})`}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
