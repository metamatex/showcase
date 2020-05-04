// generated by metactl sdk gen 
package sdk

const (
	FeedFilterName = "FeedFilter"
)

type FeedFilter struct {
    AlternativeIds *IdListFilter `json:"alternativeIds,omitempty" yaml:"alternativeIds,omitempty"`
    And []FeedFilter `json:"and,omitempty" yaml:"and,omitempty"`
    Id *ServiceIdFilter `json:"id,omitempty" yaml:"id,omitempty"`
    Info *InfoFilter `json:"info,omitempty" yaml:"info,omitempty"`
    Kind *EnumFilter `json:"kind,omitempty" yaml:"kind,omitempty"`
    Meta *TypeMetaFilter `json:"meta,omitempty" yaml:"meta,omitempty"`
    Not []FeedFilter `json:"not,omitempty" yaml:"not,omitempty"`
    Or []FeedFilter `json:"or,omitempty" yaml:"or,omitempty"`
    Set *bool `json:"set,omitempty" yaml:"set,omitempty"`
}